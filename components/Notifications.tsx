"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"

interface Notification {
  id: string
  user_id: string
  content: string
  read: boolean
  created_at: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    fetchNotifications()
    subscribeToNotifications()
  }, [])

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)

    if (error) {
      console.error("Error fetching notifications:", error)
    } else {
      setNotifications(data)
    }
  }

  const subscribeToNotifications = () => {
    const subscription = supabase
      .channel("public:notifications")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications" }, (payload) => {
        setNotifications((prevNotifications) => [payload.new as Notification, ...prevNotifications])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

    if (error) {
      console.error("Error marking notification as read:", error)
    } else {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className="relative">
      <Button onClick={toggleNotifications} variant="ghost" size="icon">
        <Bell />
        {notifications.some((notification) => !notification.read) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </Button>
      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-64">
          <CardContent className="py-2">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No new notifications</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`text-sm ${notification.read ? "text-gray-500" : "font-semibold"}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {notification.content}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

