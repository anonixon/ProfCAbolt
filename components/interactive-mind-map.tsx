"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as d3 from "d3"

interface MindMapNode {
  id: string
  name: string
  children?: MindMapNode[]
}

export function InteractiveMindMap() {
  const [data, setData] = useState<MindMapNode>({
    id: "root",
    name: "My Career",
    children: [
      {
        id: "skills",
        name: "Skills",
        children: [
          { id: "skill1", name: "Skill 1" },
          { id: "skill2", name: "Skill 2" },
          { id: "skill3", name: "Skill 3" },
        ],
      },
      {
        id: "experiences",
        name: "Experiences",
        children: [
          { id: "exp1", name: "Experience 1" },
          { id: "exp2", name: "Experience 2" },
        ],
      },
      {
        id: "goals",
        name: "Goals",
        children: [
          { id: "goal1", name: "Goal 1" },
          { id: "goal2", name: "Goal 2" },
        ],
      },
    ],
  })

  const svgRef = useRef<SVGSVGElement>(null)
  const [newNodeName, setNewNodeName] = useState("")
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)

  useEffect(() => {
    if (svgRef.current) {
      drawMindMap()
    }
  }, [svgRef]) // Updated dependency

  const drawMindMap = () => {
    const width = 800
    const height = 600
    const svg = d3.select(svgRef.current)

    svg.selectAll("*").remove()

    const root = d3.hierarchy(data)
    const treeLayout = d3.tree().size([height, width - 200])
    treeLayout(root)

    const g = svg.append("g").attr("transform", "translate(100,0)")

    const link = g
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d: any) => d.y)
          .y((d: any) => d.x),
      )

    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
      .on("click", (event, d: any) => setSelectedNode(d.data))

    node.append("circle").attr("r", 5).attr("fill", "#69b3a2")

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: any) => (d.children ? -6 : 6))
      .attr("text-anchor", (d: any) => (d.children ? "end" : "start"))
      .text((d: any) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke", "white")
      .attr("stroke-width", 3)
  }

  const addNode = () => {
    if (selectedNode && newNodeName) {
      const newNode = { id: Date.now().toString(), name: newNodeName }
      const updatedData = { ...data }
      const findAndUpdateNode = (node: MindMapNode) => {
        if (node.id === selectedNode.id) {
          node.children = node.children ? [...node.children, newNode] : [newNode]
          return true
        }
        if (node.children) {
          return node.children.some(findAndUpdateNode)
        }
        return false
      }
      findAndUpdateNode(updatedData)
      setData(updatedData)
      setNewNodeName("")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interactive Mind Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input placeholder="New node name" value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)} />
          <Button onClick={addNode} disabled={!selectedNode || !newNodeName}>
            Add Node
          </Button>
        </div>
        <div className="text-sm mb-2">
          {selectedNode ? `Selected: ${selectedNode.name}` : "Click a node to select it"}
        </div>
        <svg ref={svgRef} width="800" height="600" />
      </CardContent>
    </Card>
  )
}

