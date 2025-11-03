// export const emails = [
//   {
//     id: 1,
//     sender: "john.smith@example.com",
//     subject: "Request for Building Permit Extension",
//     body: "Dear City Hall, I am writing to request an extension for my building permit #BP-2024-1234. Due to unexpected weather delays, we need an additional 30 days.",
//     date: "1/15/2025",
//     priority: "High",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     sender: "sarah.johnson@example.com",
//     subject: "Community Center Budget Inquiry",
//     body: "Hello, I would like to inquire about the proposed budget for the new community center project.",
//     date: "1/14/2025",
//     priority: "Urgent",
//     status: "Pending",
//   },
// ];

// Mock emails matching backend structure
export const emails = [
  {
    id: 1,
    from_email: "john.smith@example.com", // Changed from 'sender'
    subject: "Request for Building Permit Extension",
    body: "Dear City Hall, I am writing to request an extension for my building permit #BP-2024-1234. Due to unexpected weather delays, we need an additional 30 days.",
    processed_at: "2025-01-15T10:30:00Z", // Changed from 'date' to ISO format
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    from_email: "sarah.johnson@example.com",
    subject: "Community Center Budget Inquiry",
    body: "Hello, I would like to inquire about the proposed budget for the new community center project.",
    processed_at: "2025-01-14T14:20:00Z",
    priority: "Urgent",
    status: "Pending",
  },
  {
    id: 3,
    from_email: "michael.brown@example.com",
    subject: "Parking Violation Appeal",
    body: "I received a parking ticket but believe it was issued in error. I have photographic evidence that my vehicle was properly parked.",
    processed_at: "2025-01-13T09:15:00Z",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 4,
    from_email: "emily.davis@example.com",
    subject: "Tree Removal Request",
    body: "There is a large dead tree on city property near my residence that poses a safety hazard. Could someone inspect it?",
    processed_at: "2025-01-12T16:45:00Z",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 5,
    from_email: "robert.wilson@example.com",
    subject: "Business License Renewal",
    body: "I need to renew my business license. What documents are required for the renewal process?",
    processed_at: "2025-01-11T11:00:00Z",
    priority: "Low",
    status: "Resolved",
  },
];