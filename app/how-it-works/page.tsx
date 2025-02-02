import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ArchitectureBlockProps {
  title: string;
  children: React.ReactNode;
}

const ArchitectureBlock: React.FC<ArchitectureBlockProps> = ({ title, children }) => (
  <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white/60 backdrop-blur-sm">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default function HowItWorksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-left text-pink-300">How It Works</h1>
        
        <div className="space-y-8">
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Model Architecture Overview</h2>
              <p className="text-lg mb-4">
                Our advanced image generation model combines self-attention mechanisms with adaptive residual blocks to create high-quality images from latent space vectors.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <ArchitectureBlock title="1. Input Processing">
              <ul className="list-disc pl-6 space-y-2">
                <li>Takes a latent vector of dimension {64 * 16 * 4 * 4} as input</li>
                <li>Transforms the input through an initial dense layer</li>
                <li>Reshapes the data into initial 4×4 feature maps</li>
              </ul>
            </ArchitectureBlock>

            <ArchitectureBlock title="2. Progressive Generation">
              <ul className="list-disc pl-6 space-y-2">
                <li>Uses a series of upsampling blocks to progressively increase resolution:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>4×4 → 8×8</li>
                    <li>8×8 → 16×16</li>
                    <li>16×16 → 32×32</li>
                    <li>32×32 → 64×64</li>
                  </ul>
                </li>
              </ul>
            </ArchitectureBlock>

            <ArchitectureBlock title="3. Key Components">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-2">Self-Attention Mechanism</h4>
                  <p>Allows the model to focus on relevant spatial locations while generating images</p>
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

            <ArchitectureBlock title="5. Final Output">
              <ul className="list-disc pl-6 space-y-2">
                <li>Final convolution layer maps features to RGB channels</li>
                <li>Tanh activation ensures output values are in [-1, 1] range</li>
                <li>Produces high-quality 64×64 images</li>
              </ul>
            </ArchitectureBlock>
          </div>
        </div>
      </div>
    </main>
  );
}