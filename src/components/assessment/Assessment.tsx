import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiService } from '@services/api'
import { Assessment as AssessmentType, Question } from '@/types'
import { Button } from '@components/ui/Button'

export function Assessment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [assessment, setAssessment] = useState<AssessmentType | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        if (!id) return
        const data = await apiService.getAssessment(id)
        setAssessment(data)
      } catch (error) {
        console.error('Error fetching assessment:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [id])

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (assessment && currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!assessment || !id) return

    try {
      setSubmitting(true)
      await apiService.submitAssessment(id, answers)
      navigate('/dashboard', { state: { message: 'Assessment completed successfully!' } })
    } catch (error) {
      console.error('Error submitting assessment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div>Loading assessment...</div>
  }

  if (!assessment) {
    return <div>Assessment not found</div>
  }

  const question = assessment.questions[currentQuestion]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{assessment.title}</h1>
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {assessment.questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium">{question.text}</h2>
        <div className="mt-4 space-y-2">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => handleAnswer(question.id, option)}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion === assessment.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length !== assessment.questions.length}
          >
            {submitting ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
} 