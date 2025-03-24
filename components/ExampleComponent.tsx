"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"

export default function ExampleComponent() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("your_table").select("*")

      if (error) {
        console.error("Error fetching data:", error)
      } else {
        setData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {/* Render your data here */}
      {data && (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

