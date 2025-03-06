import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About StyleHub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to make quality fashion accessible to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              StyleHub was founded in 2020 with a simple idea: create high-quality clothing that's accessible to everyone. 
              What started as a small online store has grown into a beloved brand with customers worldwide.
            </p>
            <p className="text-lg">
              We believe that great style shouldn't come with a premium price tag. By working directly with manufacturers 
              and selling exclusively online, we're able to offer exceptional quality at prices that make sense.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="StyleHub team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p>
                We never compromise on quality. Every piece of clothing we sell is made to last, 
                using premium materials and expert craftsmanship.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p>
                We're committed to reducing our environmental impact through responsible 
                sourcing, eco-friendly packaging, and ethical manufacturing practices.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
              <p>
                Fashion is for everyone. We design clothes for all body types and styles, 
                ensuring that everyone can find something they love.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The passionate people behind StyleHub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Sarah Chen",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Emma Williams",
                role: "Lead Designer",
                image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                </div>
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}