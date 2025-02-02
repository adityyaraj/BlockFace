import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Cpu, Database, Zap } from "lucide-react"

interface ArchitectureBlockProps {
  title: string
  children: React.ReactNode
}

const ArchitectureBlock: React.FC<ArchitectureBlockProps> = ({ title, children }) => (
  <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white/60 backdrop-blur-sm">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {children}
  </div>
)

interface PipelineStepProps {
  icon: React.ReactNode
  title: string
  description: string
}

const PipelineStep: React.FC<PipelineStepProps> = ({ icon, title, description }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  </div>
)

export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-left text-white">How It Works</h1>

        <div className="space-y-8">
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Model Architecture Overview</h2>
              <p className="text-lg mb-4">
                Our advanced image generation model combines self-attention mechanisms with adaptive residual blocks to
                create high-quality Minecraft skins from latent space vectors.
              </p>
            </CardContent>
          </Card>

          <ArchitectureBlock title="1. Testing/Inference Process">
            <div className="space-y-4">
              <PipelineStep
                icon={<Database className="w-6 h-6" />}
                title="Input Vector"
                description="Start with a latent vector of dimension 16384 (64 * 16 * 4 * 4)"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Cpu className="w-6 h-6" />}
                title="Initial Processing"
                description="Transform through dense layer and reshape into 4x4 feature maps"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Zap className="w-6 h-6" />}
                title="Progressive Upsampling"
                description="Increase resolution: 4x4 → 8x8 → 16x16 → 32x32 → 64x64"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Database className="w-6 h-6" />}
                title="Final Output"
                description="Generate high-quality 64x64 Minecraft skin image"
              />
            </div>
          </ArchitectureBlock>

          <ArchitectureBlock title="2. Training Process">
            <div className="space-y-4">
              <PipelineStep
                icon={<Database className="w-6 h-6" />}
                title="Dataset Preparation"
                description="Collect and preprocess diverse Minecraft skin images"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Cpu className="w-6 h-6" />}
                title="Model Initialization"
                description="Set up generator and discriminator with random weights"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Zap className="w-6 h-6" />}
                title="Adversarial Training"
                description="Alternate between training generator and discriminator"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Cpu className="w-6 h-6" />}
                title="Fine-tuning"
                description="Adjust hyperparameters and architecture for optimal performance"
              />
              <ArrowRight className="w-6 h-6 mx-auto my-2" />
              <PipelineStep
                icon={<Database className="w-6 h-6" />}
                title="Model Evaluation"
                description="Assess quality of generated skins and iterate if necessary"
              />
            </div>
          </ArchitectureBlock>

          <ArchitectureBlock title="3. Key Components">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-2">Self-Attention Mechanism</h4>
                <p>Allows the model to focus on relevant spatial locations while generating Minecraft skins</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Adaptive Residual Blocks</h4>
                <p>Combines residual connections with squeeze-and-excitation for better feature refinement</p>
              </div>
            </div>
          </ArchitectureBlock>

          <ArchitectureBlock title="4. Advanced Features">
            <ul className="list-disc pl-6 space-y-2">
              <li>Spectral Normalization for stable training</li>
              <li>Squeeze-and-Excitation blocks for adaptive feature recalibration</li>
              <li>Conditional batch normalization for improved generation quality</li>
              <li>LeakyReLU activation functions for better gradient flow</li>
            </ul>
          </ArchitectureBlock>
        </div>
      </div>
    </main>
  )
}

