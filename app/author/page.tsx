import { Github } from "lucide-react"
import Link from "next/link"

const AuthorCard = ({
  name,
  role,
  description,
  github,
}: { name: string; role: string; description: string; github: string }) => (
  <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 mb-8">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-200">{role}</p>
      </div>
    </div>
    <p className="mb-4">{description}</p>
    <Link
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-300 hover:text-blue-100"
    >
      <Github className="w-5 h-5 mr-2" />
      GitHub Profile
    </Link>
  </div>
)

export default function AuthorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 relative">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left text-white">About the Authors</h1>
        <AuthorCard
          name="Abhigyan"
          role="AI Researcher & Software Developer"
          description="Description for Author 1. You can add more details about their experience and contributions here."
          github="https://github.com/abhigyan126"
        />
        <AuthorCard
          name="Aditya Raj"
          role="AI Researcher & Software Developer"
          description="Description for Author 2. You can add more details about their experience and contributions here."
          github="https://github.com/adityyaraj"
        />
      </div>
    </main>
  )
}

