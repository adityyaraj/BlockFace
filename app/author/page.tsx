import { Github } from "lucide-react"
import Link from "next/link"

const AuthorCard = ({
  name,
  role,
  description,
  github,
}: { name: string; role: string; description: string; github: string }) => (
  <div className="bg-white/10 bg-opacity-20 backdrop-blur-md rounded-lg p-6 mb-8">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
      <img
        src={description}
        alt={name}
        className="w-16 h-16 rounded-full mr-4"
      />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-blue-300">{name}</h2>
        <p className="text-white">{role}</p>
      </div>
    </div>
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-orange-300">About the Authors</h1>
        <AuthorCard
          name="Abhigyan"
          role="AI&ML & Software Developer"
          description="/108809711.jpeg"
          github="https://github.com/abhigyan126"
        />
        <AuthorCard
          name="Aditya Raj"
          role="AI&ML & Software Developer"
          description="/92661311.jpeg"
          github="https://github.com/adityyaraj"
        />
      </div>
    </main>
  )
}

