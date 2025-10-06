import type { IGroupMessages } from "../types/GroupMessages";

export const sampleGroupMessages: IGroupMessages[] = [
  {
    _id: "msg001",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Hey everyone! I just created this group for our project updates.Nice! Looking forward to collaborating here.Nice! Looking forward to collaborating here.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:00:00.000Z",
    updatedAt: "2025-10-06T09:00:00.000Z"
  },
  {
    _id: "msg002",
    groupId: "grp101",
    senderId: "usr002",
    text: "Nice! Looking forward to collaborating here.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:02:00.000Z",
    updatedAt: "2025-10-06T09:02:00.000Z"
  },
  {
    _id: "msg003",
    groupId: "grp101",
    senderId: "usr003",
    text: "Here’s our team logo preview!",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
        fileType: "image"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:05:00.000Z",
    updatedAt: "2025-10-06T09:05:00.000Z"
  },
  {
    _id: "msg004",
    groupId: "grp101",
    senderId: "usr004",
    text: "I recorded some notes from our last meeting.",
    attachment: [
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        fileType: "voice"
      }
    ],
    type: "voice",
    createdAt: "2025-10-06T09:08:00.000Z",
    updatedAt: "2025-10-06T09:08:00.000Z"
  },
  {
    _id: "msg005",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "That sounds great, I’ll review it today.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:10:00.000Z",
    updatedAt: "2025-10-06T09:10:00.000Z"
  },
  {
    _id: "msg006",
    groupId: "grp101",
    senderId: "usr005",
    text: "Here’s the reference image and audio intro we discussed.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        fileType: "image"
      },
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        fileType: "voice"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:12:00.000Z",
    updatedAt: "2025-10-06T09:12:00.000Z"
  },
  {
    _id: "msg007",
    groupId: "grp101",
    senderId: "usr002",
    text: "I’ll share the final design by evening.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:13:30.000Z",
    updatedAt: "2025-10-06T09:13:30.000Z"
  },
  {
    _id: "msg008",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Let’s finalize the presentation slides this week.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:15:00.000Z",
    updatedAt: "2025-10-06T09:15:00.000Z"
  },
  {
    _id: "msg009",
    groupId: "grp101",
    senderId: "usr006",
    text: "Here’s a photo of the setup from the event.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1557683316-973673baf926",
        fileType: "image"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:17:00.000Z",
    updatedAt: "2025-10-06T09:17:00.000Z"
  },
  {
    _id: "msg010",
    groupId: "grp101",
    senderId: "usr003",
    text: "Thanks! That looks amazing.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:18:00.000Z",
    updatedAt: "2025-10-06T09:18:00.000Z"
  },
  {
    _id: "msg011",
    groupId: "grp101",
    senderId: "usr004",
    text: "Uploading a quick voice note.",
    attachment: [
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        fileType: "voice"
      }
    ],
    type: "voice",
    createdAt: "2025-10-06T09:20:00.000Z",
    updatedAt: "2025-10-06T09:20:00.000Z"
  },
  {
    _id: "msg012",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Got it. I’ll merge the updates tomorrow morning.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:22:00.000Z",
    updatedAt: "2025-10-06T09:22:00.000Z"
  },
  {
    _id: "msg013",
    groupId: "grp101",
    senderId: "usr005",
    text: "Here’s a combination of image and voice for review.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        fileType: "image"
      },
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        fileType: "voice"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:23:00.000Z",
    updatedAt: "2025-10-06T09:23:00.000Z"
  },
  {
    _id: "msg014",
    groupId: "grp101",
    senderId: "usr002",
    text: "Text-only again for sync testing.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:24:00.000Z",
    updatedAt: "2025-10-06T09:24:00.000Z"
  },
  {
    _id: "msg015",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Looks stable now, I think lag is resolved.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:25:00.000Z",
    updatedAt: "2025-10-06T09:25:00.000Z"
  },
  {
    _id: "msg016",
    groupId: "grp101",
    senderId: "usr006",
    text: "Agreed. Performance is better now.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:26:00.000Z",
    updatedAt: "2025-10-06T09:26:00.000Z"
  },
  {
    _id: "msg017",
    groupId: "grp101",
    senderId: "usr003",
    text: "Here’s a quick concept shot.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        fileType: "image"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:27:00.000Z",
    updatedAt: "2025-10-06T09:27:00.000Z"
  },
  {
    _id: "msg018",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Cool shot! Let’s use that in the cover slide.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:28:00.000Z",
    updatedAt: "2025-10-06T09:28:00.000Z"
  },
  {
    _id: "msg019",
    groupId: "grp101",
    senderId: "usr002",
    text: "Almost done preparing the report.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:29:00.000Z",
    updatedAt: "2025-10-06T09:29:00.000Z"
  },
  {
    _id: "msg020",
    groupId: "grp101",
    senderId: "usr005",
    text: "Uploading one more image for banner design.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        fileType: "image"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:30:00.000Z",
    updatedAt: "2025-10-06T09:30:00.000Z"
  },
  {
    _id: "msg021",
    groupId: "grp101",
    senderId: "usr006",
    text: "Got it, saving progress now.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:31:00.000Z",
    updatedAt: "2025-10-06T09:31:00.000Z"
  },
  {
    _id: "msg022",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "We’re almost ready for the demo session.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:32:00.000Z",
    updatedAt: "2025-10-06T09:32:00.000Z"
  },
  {
    _id: "msg023",
    groupId: "grp101",
    senderId: "usr002",
    text: "Should I prepare a short audio intro?",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:33:00.000Z",
    updatedAt: "2025-10-06T09:33:00.000Z"
  },
  {
    _id: "msg024",
    groupId: "grp101",
    senderId: "usr004",
    text: "Sure, I’ll help with background track.",
    attachment: [
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        fileType: "voice"
      }
    ],
    type: "voice",
    createdAt: "2025-10-06T09:34:00.000Z",
    updatedAt: "2025-10-06T09:34:00.000Z"
  },
  {
    _id: "msg025",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Perfect! That will sound great in the presentation.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:35:00.000Z",
    updatedAt: "2025-10-06T09:35:00.000Z"
  },
  {
    _id: "msg026",
    groupId: "grp101",
    senderId: "usr006",
    text: "Almost everything’s in place now.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:36:00.000Z",
    updatedAt: "2025-10-06T09:36:00.000Z"
  },
  {
    _id: "msg027",
    groupId: "grp101",
    senderId: "usr005",
    text: "Here’s a combo test with image and text.",
    attachment: [
      {
        url: "https://images.unsplash.com/photo-1536305030016-3e3b07a7b61a",
        fileType: "image"
      }
    ],
    type: "media",
    createdAt: "2025-10-06T09:37:00.000Z",
    updatedAt: "2025-10-06T09:37:00.000Z"
  },
  {
    _id: "msg028",
    groupId: "grp101",
    senderId: "usr002",
    text: "Looks awesome. Great job, team!",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:38:00.000Z",
    updatedAt: "2025-10-06T09:38:00.000Z"
  },
  {
    _id: "msg029",
    groupId: "grp101",
    senderId: "68d417cc49cd55839387bc26",
    text: "Let’s wrap up with the final sync later today.",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:39:00.000Z",
    updatedAt: "2025-10-06T09:39:00.000Z"
  },
  {
    _id: "msg030",
    groupId: "grp101",
    senderId: "usr003",
    text: "All done! Great teamwork, everyone!",
    attachment: [],
    type: "text",
    createdAt: "2025-10-06T09:40:00.000Z",
    updatedAt: "2025-10-06T09:40:00.000Z"
  }
];
