// Mock data for test users and posts
const mockUsers = [
  {
    _id: "507f1f77bcf86cd799439011", // Mock ObjectId
    name: "Alice Johnson",
    userName: "alice_j",
    email: "alice@example.com",
    Photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    followers: [],
    following: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "Bob Smith",
    userName: "bob_smith",
    email: "bob@example.com",
    Photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    followers: [],
    following: ["507f1f77bcf86cd799439011"]
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "Charlie Brown",
    userName: "charlie_b",
    email: "charlie@example.com",
    Photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    followers: [],
    following: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
  }
];

const mockPosts = [
  {
    _id: "507f1f77bcf86cd799439021",
    body: "Enjoying a beautiful sunset! 🌅",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    likes: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    comments: [
      { comment: "Stunning!", postedBy: { _id: "507f1f77bcf86cd799439012", name: "Bob Smith" } },
      { comment: "Where was this taken?", postedBy: { _id: "507f1f77bcf86cd799439013", name: "Charlie Brown" } }
    ],
    postedBy: mockUsers[0],
    createdAt: new Date("2025-12-10")
  },
  {
    _id: "507f1f77bcf86cd799439022",
    body: "Coffee and coding ☕💻",
    photo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop",
    likes: ["507f1f77bcf86cd799439011"],
    comments: [],
    postedBy: mockUsers[1],
    createdAt: new Date("2025-12-11")
  },
  {
    _id: "507f1f77bcf86cd799439023",
    body: "Exploring the city streets 🏙️",
    photo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
    likes: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
    comments: [
      { comment: "Looks amazing!", postedBy: { _id: "507f1f77bcf86cd799439011", name: "Alice Johnson" } }
    ],
    postedBy: mockUsers[2],
    createdAt: new Date("2025-12-12")
  },
  {
    _id: "507f1f77bcf86cd799439024",
    body: "Fresh baked bread 🥖",
    photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop",
    likes: [],
    comments: [],
    postedBy: mockUsers[0],
    createdAt: new Date("2025-12-13")
  },
  {
    _id: "507f1f77bcf86cd799439025",
    body: "Mountain hiking adventure ⛰️",
    photo: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=500&fit=crop",
    likes: ["507f1f77bcf86cd799439013"],
    comments: [],
    postedBy: mockUsers[1],
    createdAt: new Date("2025-12-14")
  }
];

module.exports = { mockUsers, mockPosts };