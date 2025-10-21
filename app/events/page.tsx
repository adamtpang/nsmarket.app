import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockEvents = [
  {
    id: "1",
    title: "Sleep Optimization Workshop",
    description: "Learn about the Sleep Starter Pack and get tips for better sleep quality from wellness experts.",
    date: "2025-02-15",
    time: "6:00 PM - 8:00 PM",
    location: "NS Community Center",
    attendees: 24,
    maxAttendees: 30,
    image: "/sleep-workshop.jpg",
    host: "Sarah Chen",
  },
  {
    id: "2",
    title: "Tech Gear Swap Meet",
    description: "Bring your unused electronics and swap with other community members. Great for finding deals!",
    date: "2025-02-20",
    time: "2:00 PM - 5:00 PM",
    location: "NS Main Hall",
    attendees: 42,
    maxAttendees: 50,
    image: "/tech-swap.jpg",
    host: "Mike Johnson",
  },
  {
    id: "3",
    title: "Mountain Bike Trail Ride",
    description: "Group ride through local trails. Bike rentals available from the marketplace!",
    date: "2025-02-22",
    time: "9:00 AM - 12:00 PM",
    location: "Trailhead Parking",
    attendees: 15,
    maxAttendees: 20,
    image: "/group-bike-ride.jpg",
    host: "Alex Rivera",
  },
]

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="container py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Community Events</h1>
            <p className="text-muted-foreground">Product demos, meetups, and community gatherings</p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {mockEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={event.image || "/placeholder.svg?height=400&width=600"}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">
                    {event.attendees}/{event.maxAttendees} attending
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Hosted by {event.host}</span>
                    </div>
                  </div>

                  <Button className="w-full">RSVP to Event</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
