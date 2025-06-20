const students = [
  {
    id: 1001,
    name: "Mac Miller",
    tpLevel: 3,
    teacherComment: "Good progress in speaking.",
    writingScore: 85.5,
    readingScore: 78.0,
    speakingScore: 90.0,
    listeningScore: 88.5
  },
  {
    id: 1002,
    name: "Diana Jo",
    tpLevel: 2,
    teacherComment: "Needs help in reading.",
    writingScore: 65.0,
    readingScore: 55.5,
    speakingScore: 70.0,
    listeningScore: 60.0
  },
  {
    id: 1003,
    name: "Marie Curie",
    tpLevel: 4,
    teacherComment: "Excellent across all areas.",
    writingScore: 92.0,
    readingScore: 89.5,
    speakingScore: 93.0,
    listeningScore: 91.0
  }
];

if (!localStorage.getItem('students')) {
  localStorage.setItem('students', JSON.stringify(students));
  console.log('Student database initialized.');
}
