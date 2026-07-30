import { StudentProfile } from '../types';

export function generateSeedStudents(): StudentProfile[] {
  const students: StudentProfile[] = [
    {
      student_id: '4070',
      student_name: 'Sabuj Shaikh',
      gender: 'Male',
      distance_from_home: 'Near',
      learning_disabilities: 'No',
      parental_involvement: 'High',
      parental_education_level: 'Postgraduate',
      family_income: 'High',
      access_to_resources: 'High',
      tutoring_sessions: 4,
      school_type: 'Private',
      teacher_quality: 'High',
      motivation_level: 'High',
      extracurricular_activities: 'Yes',
      internet_access: 'Yes',
      peer_influence: 'Positive',
      physical_activity: 4,
      sleep_hours: 8,
      hours_studied: 28,
      attendance: 96,
      previous_scores: 88,
      exam_score: 92.5,
      gpa: 4.0,
      cgpa: 3.92,
      performance_band: 'High-Performing',
      risk_level: 'Low Risk',
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: 95, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: 92, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: 90, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: 89, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: 94, grade: 'A+', gpa: 4.0 }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: 3.85, attendance: 94 },
        { semester: 'Semester 2', gpa: 3.88, attendance: 95 },
        { semester: 'Semester 3', gpa: 3.90, attendance: 96 },
        { semester: 'Semester 4', gpa: 3.95, attendance: 97 },
        { semester: 'Semester 5', gpa: 3.92, attendance: 95 },
        { semester: 'Semester 6', gpa: 4.00, attendance: 96 }
      ]
    },
    {
      student_id: '4069',
      student_name: 'Md Nazim Uddin',
      gender: 'Male',
      distance_from_home: 'Moderate',
      learning_disabilities: 'No',
      parental_involvement: 'High',
      parental_education_level: 'College',
      family_income: 'High',
      access_to_resources: 'High',
      tutoring_sessions: 3,
      school_type: 'Public',
      teacher_quality: 'High',
      motivation_level: 'High',
      extracurricular_activities: 'Yes',
      internet_access: 'Yes',
      peer_influence: 'Positive',
      physical_activity: 5,
      sleep_hours: 7,
      hours_studied: 25,
      attendance: 92,
      previous_scores: 85,
      exam_score: 88.0,
      gpa: 4.0,
      cgpa: 3.85,
      performance_band: 'High-Performing',
      risk_level: 'Low Risk',
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: 90, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: 88, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: 86, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: 85, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: 91, grade: 'A+', gpa: 4.0 }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: 3.75, attendance: 90 },
        { semester: 'Semester 2', gpa: 3.80, attendance: 91 },
        { semester: 'Semester 3', gpa: 3.82, attendance: 92 },
        { semester: 'Semester 4', gpa: 3.86, attendance: 93 },
        { semester: 'Semester 5', gpa: 3.88, attendance: 92 },
        { semester: 'Semester 6', gpa: 4.00, attendance: 92 }
      ]
    },
    {
      student_id: 'STU-1003',
      student_name: 'Wafa Ahmed',
      gender: 'Female',
      distance_from_home: 'Near',
      learning_disabilities: 'No',
      parental_involvement: 'Medium',
      parental_education_level: 'College',
      family_income: 'Medium',
      access_to_resources: 'Medium',
      tutoring_sessions: 2,
      school_type: 'Private',
      teacher_quality: 'Medium',
      motivation_level: 'Medium',
      extracurricular_activities: 'Yes',
      internet_access: 'Yes',
      peer_influence: 'Positive',
      physical_activity: 3,
      sleep_hours: 7,
      hours_studied: 18,
      attendance: 84,
      previous_scores: 74,
      exam_score: 76.5,
      gpa: 3.75,
      cgpa: 3.60,
      performance_band: 'Average',
      risk_level: 'Moderate Risk',
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: 78, grade: 'A', gpa: 3.75 },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: 75, grade: 'A', gpa: 3.75 },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: 76, grade: 'A', gpa: 3.75 },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: 74, grade: 'A-', gpa: 3.50 },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: 80, grade: 'A+', gpa: 4.0 }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: 3.50, attendance: 82 },
        { semester: 'Semester 2', gpa: 3.55, attendance: 83 },
        { semester: 'Semester 3', gpa: 3.60, attendance: 84 },
        { semester: 'Semester 4', gpa: 3.62, attendance: 85 },
        { semester: 'Semester 5', gpa: 3.58, attendance: 83 },
        { semester: 'Semester 6', gpa: 3.75, attendance: 84 }
      ]
    },
    {
      student_id: 'STU-1004',
      student_name: 'Nadia Akter Luna',
      gender: 'Female',
      distance_from_home: 'Moderate',
      learning_disabilities: 'No',
      parental_involvement: 'High',
      parental_education_level: 'Postgraduate',
      family_income: 'High',
      access_to_resources: 'High',
      tutoring_sessions: 3,
      school_type: 'Private',
      teacher_quality: 'High',
      motivation_level: 'High',
      extracurricular_activities: 'Yes',
      internet_access: 'Yes',
      peer_influence: 'Positive',
      physical_activity: 4,
      sleep_hours: 8,
      hours_studied: 26,
      attendance: 95,
      previous_scores: 89,
      exam_score: 91.0,
      gpa: 4.0,
      cgpa: 3.90,
      performance_band: 'High-Performing',
      risk_level: 'Low Risk',
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: 93, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: 90, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: 89, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: 88, grade: 'A+', gpa: 4.0 },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: 95, grade: 'A+', gpa: 4.0 }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: 3.80, attendance: 93 },
        { semester: 'Semester 2', gpa: 3.85, attendance: 94 },
        { semester: 'Semester 3', gpa: 3.90, attendance: 95 },
        { semester: 'Semester 4', gpa: 3.92, attendance: 96 },
        { semester: 'Semester 5', gpa: 3.91, attendance: 94 },
        { semester: 'Semester 6', gpa: 4.00, attendance: 95 }
      ]
    },
    {
      student_id: 'STU-1005',
      student_name: 'Tanvir Rahman',
      gender: 'Male',
      distance_from_home: 'Far',
      learning_disabilities: 'No',
      parental_involvement: 'Low',
      parental_education_level: 'High School',
      family_income: 'Low',
      access_to_resources: 'Low',
      tutoring_sessions: 0,
      school_type: 'Public',
      teacher_quality: 'Low',
      motivation_level: 'Low',
      extracurricular_activities: 'No',
      internet_access: 'No',
      peer_influence: 'Negative',
      physical_activity: 1,
      sleep_hours: 5,
      hours_studied: 8,
      attendance: 64,
      previous_scores: 52,
      exam_score: 51.5,
      gpa: 2.5,
      cgpa: 2.65,
      performance_band: 'At-Risk',
      risk_level: 'High Risk',
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: 54, grade: 'C+', gpa: 2.5 },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: 50, grade: 'C', gpa: 2.25 },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: 52, grade: 'C+', gpa: 2.5 },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: 48, grade: 'D', gpa: 2.0 },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: 53, grade: 'C+', gpa: 2.5 }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: 2.80, attendance: 70 },
        { semester: 'Semester 2', gpa: 2.75, attendance: 68 },
        { semester: 'Semester 3', gpa: 2.70, attendance: 66 },
        { semester: 'Semester 4', gpa: 2.65, attendance: 65 },
        { semester: 'Semester 5', gpa: 2.60, attendance: 64 },
        { semester: 'Semester 6', gpa: 2.50, attendance: 64 }
      ]
    }
  ];

  // Generate additional students STU-1006 to STU-1050 to provide rich database records
  const sampleNames = [
    'Ayesha Siddiqua', 'Mahmudul Hasan', 'Farhana Chowdhury', 'Naimur Rahman', 'Sadia Islam',
    'Rifat Hossain', 'Anika Tabassum', 'Mehedi Hasan', 'Tasnim Akter', 'Shahriar Ahmed',
    'Faria Sultana', 'Zubayer Hossain', 'Nusrat Jahan', 'Kazi Arman', 'Lamia Parveen',
    'Ashraful Islam', 'Shakiba Rahman', 'Imtiaz Ahmed', 'Sumaiya Khan', 'Jahidul Islam',
    'Tania Akter', 'Rakibul Hasan', 'Priya Roy', 'Sourav Das', 'Jannatul Ferdous',
    'Mithun Hasan', 'Mitu Akter', 'Habibur Rahman', 'Suraiya Begum', 'Fahim Morshed',
    'Tasmia Islam', 'Kamrul Hasan', 'Fariha Yasmin', 'Sabbir Ahmed', 'Sharmin Akter',
    'Sojib Hossain', 'Rukaiya Khan', 'Tamim Iqbal', 'Khadija Tul Kobra', 'Riad Chowdhury',
    'Suborna Akter', 'Nayeem Islam', 'Tahrima Rahman', 'Asif Mahmud', 'Fahmida Hasan'
  ];

  sampleNames.forEach((name, i) => {
    const stuNum = 1006 + i;
    const isAtRisk = i % 5 === 0;
    const isHigh = i % 3 === 0 && !isAtRisk;

    const hours = isHigh ? Math.floor(22 + Math.random() * 10) : isAtRisk ? Math.floor(6 + Math.random() * 8) : Math.floor(14 + Math.random() * 10);
    const att = isHigh ? Math.floor(90 + Math.random() * 10) : isAtRisk ? Math.floor(60 + Math.random() * 14) : Math.floor(75 + Math.random() * 14);
    const prev = isHigh ? Math.floor(82 + Math.random() * 16) : isAtRisk ? Math.floor(45 + Math.random() * 14) : Math.floor(65 + Math.random() * 14);
    
    const baseScore = (att * 0.42) + (hours * 1.1) + (prev * 0.38);
    const score = Math.min(100, Math.max(40, Math.round(baseScore * 10) / 10));

    let band: 'At-Risk' | 'Average' | 'High-Performing' = 'Average';
    let risk: 'High Risk' | 'Moderate Risk' | 'Low Risk' = 'Moderate Risk';
    let gpa = 3.25;

    if (score < 60 || att < 75) {
      band = 'At-Risk';
      risk = 'High Risk';
      gpa = score >= 55 ? 2.75 : 2.25;
    } else if (score >= 80) {
      band = 'High-Performing';
      risk = 'Low Risk';
      gpa = 4.0;
    } else {
      band = 'Average';
      risk = 'Moderate Risk';
      gpa = score >= 75 ? 3.75 : score >= 70 ? 3.5 : 3.25;
    }

    students.push({
      student_id: `STU-${stuNum}`,
      student_name: name,
      gender: i % 2 === 0 ? 'Female' : 'Male',
      distance_from_home: i % 3 === 0 ? 'Far' : i % 2 === 0 ? 'Near' : 'Moderate',
      learning_disabilities: 'No',
      parental_involvement: isHigh ? 'High' : isAtRisk ? 'Low' : 'Medium',
      parental_education_level: isHigh ? 'Postgraduate' : isAtRisk ? 'High School' : 'College',
      family_income: isHigh ? 'High' : isAtRisk ? 'Low' : 'Medium',
      access_to_resources: isHigh ? 'High' : isAtRisk ? 'Low' : 'Medium',
      tutoring_sessions: isHigh ? 3 : isAtRisk ? 0 : 1,
      school_type: i % 2 === 0 ? 'Public' : 'Private',
      teacher_quality: isHigh ? 'High' : 'Medium',
      motivation_level: isHigh ? 'High' : isAtRisk ? 'Low' : 'Medium',
      extracurricular_activities: i % 2 === 0 ? 'Yes' : 'No',
      internet_access: isAtRisk && i % 2 === 0 ? 'No' : 'Yes',
      peer_influence: isHigh ? 'Positive' : isAtRisk ? 'Negative' : 'Neutral',
      physical_activity: Math.floor(1 + Math.random() * 5),
      sleep_hours: Math.floor(5 + Math.random() * 4),
      hours_studied: hours,
      attendance: att,
      previous_scores: prev,
      exam_score: score,
      gpa: gpa,
      cgpa: Math.round((gpa - (Math.random() * 0.2)) * 100) / 100,
      performance_band: band,
      risk_level: risk,
      subject_marks: [
        { subject_code: 'CSE 06124160', subject_name: 'Data Warehouse & Data Mining Lab', credits: 3, marks: Math.min(100, score + 2), grade: gpa === 4.0 ? 'A+' : gpa >= 3.5 ? 'A' : 'B', gpa: gpa },
        { subject_code: 'CSE 06124150', subject_name: 'Machine Learning & AI Principles', credits: 3, marks: Math.max(40, score - 3), grade: gpa === 4.0 ? 'A+' : gpa >= 3.5 ? 'A-' : 'C+', gpa: gpa },
        { subject_code: 'CSE 06124140', subject_name: 'Database Management Systems', credits: 3, marks: Math.min(100, score + 1), grade: gpa === 4.0 ? 'A+' : gpa >= 3.5 ? 'A' : 'B', gpa: gpa },
        { subject_code: 'CSE 06124130', subject_name: 'Advanced Design & Algorithms', credits: 3, marks: Math.max(40, score - 2), grade: gpa === 4.0 ? 'A+' : gpa >= 3.5 ? 'A-' : 'C', gpa: gpa },
        { subject_code: 'CSE 06124120', subject_name: 'Full Stack Web Engineering', credits: 3, marks: Math.min(100, score + 4), grade: gpa === 4.0 ? 'A+' : gpa >= 3.5 ? 'A+' : 'B+', gpa: gpa }
      ],
      semester_history: [
        { semester: 'Semester 1', gpa: Math.round((gpa - 0.2) * 100) / 100, attendance: att - 2 },
        { semester: 'Semester 2', gpa: Math.round((gpa - 0.1) * 100) / 100, attendance: att - 1 },
        { semester: 'Semester 3', gpa: gpa, attendance: att },
        { semester: 'Semester 4', gpa: gpa, attendance: att },
        { semester: 'Semester 5', gpa: gpa, attendance: att },
        { semester: 'Semester 6', gpa: gpa, attendance: att }
      ]
    });
  });

  return students;
}
