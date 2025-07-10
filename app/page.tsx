"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Brain, ArrowLeft, Send } from "lucide-react"

export default function Home() {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedText, setSubmittedText] = useState("")
  const [currentView, setCurrentView] = useState<"form" | "chat">("form")

  // Chat state
  const [question, setQuestion] = useState("")
  const [isAsking, setIsAsking] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsSubmitting(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmittedText(text)
    setCurrentView("chat")
    setIsSubmitting(false)
  }

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsAsking(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setAiResponse(
      `Based on your text, here's my response to "${question}": This is a simulated AI response that will be replaced with your actual AI integration using React Query.`,
    )
    setIsAsking(false)
  }

  const handleReset = () => {
    setQuestion("")
    setAiResponse("")
  }

  const handleBackToForm = () => {
    setText("")
    setSubmittedText("")
    setCurrentView("form")
    setQuestion("")
    setAiResponse("")
  }

  if (currentView === "chat") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToForm} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Query</h1>
            </div>
          </div>

          {/* Submitted Text Preview */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Your Text</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg max-h-32 overflow-y-auto">
                <p className="text-sm text-gray-700">{submittedText}</p>
              </div>
            </CardContent>
          </Card>

          {/* Question Input */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Ask a Question</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAskQuestion} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What would you like to know about your text?"
                    disabled={isAsking}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!question.trim() || isAsking}>
                    {isAsking ? (
                      "Asking..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* AI Response */}
          {aiResponse && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">AI Response</h2>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Ask Another
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">{aiResponse}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Smart Query</h1>
          </div>
          <p className="text-gray-600">Enter your text below and submit for processing</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[200px] resize-none"
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full" disabled={!text.trim() || isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
