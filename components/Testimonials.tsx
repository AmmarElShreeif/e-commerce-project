import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    content:
      "The quality of clothes from StyleHub is exceptional. Ive been shopping here for years and have never been disappointed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    content:
      "Fast shipping, great customer service, and stylish clothes. What more could you ask for?",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Stylist",
    content:
      "I recommend StyleHub to all my clients. Their collection is always on trend and the quality is consistent.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 text-center">
          What Our Customers Say
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our customers have to say
          about their shopping experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6 flex-grow">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
