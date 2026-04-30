type User @table {
  email: String!
  passwordHash: String!
  createdAt: Timestamp!
  displayName: String
  photoUrl: String
}

type Sport @table {
  name: String!
  description: String
}

type Venue @table {
  name: String!
  address: String!
  capacity: Int
  imageUrl: String
}

type Event @table {
  sport: Sport!
  venue: Venue!
  title: String!
  eventDate: Date!
  startTime: Timestamp!
  createdAt: Timestamp!
  description: String
  imageUrl: String
}

type Ticket @table {
  event: Event!
  seatNumber: String!
  section: String!
  row: String!
  price: Float!
  status: String!
  bookingReference: String
}

type Booking @table {
  user: User!
  event: Event!
  bookingDate: Timestamp!
  totalAmount: Float!
  status: String!
  paymentConfirmationId: String
}

type BookingTicket @table(key: ["booking", "ticket"]) {
  booking: Booking!
  ticket: Ticket!
  quantity: Int!
}
