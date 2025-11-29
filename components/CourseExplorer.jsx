import { useState, useEffect } from 'react'
import coursesDataImport from '../src/courses.json'
import Sidebar from './Sidebar'
import ContentArea from './ContentArea'
import SearchBar from './SearchBar'

function CourseExplorer() {
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedTopic, setSelectedTopic] = useState(null)
    const [selectedSubtopic, setSelectedSubtopic] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [completedSubtopics, setCompletedSubtopics] = useState({})

    // Load courses and completion state from localStorage
    useEffect(() => {
        // Extract courses array and add IDs if they don't exist
        const coursesArray = coursesDataImport.courses || coursesDataImport
        const coursesWithIds = coursesArray.map((course, index) => ({
            ...course,
            id: course.id || index + 1
        }))
        setCourses(coursesWithIds)

        // Load completed subtopics from localStorage
        const saved = localStorage.getItem('completedSubtopics')
        if (saved) {
            setCompletedSubtopics(JSON.parse(saved))
        }
    }, [])

    // Save completion state to localStorage
    useEffect(() => {
        localStorage.setItem('completedSubtopics', JSON.stringify(completedSubtopics))
    }, [completedSubtopics])

    const toggleSubtopicCompletion = (courseId, topicIndex, subtopicIndex) => {
        const key = `${courseId}-${topicIndex}-${subtopicIndex}`
        setCompletedSubtopics(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const getCompletionPercentage = (courseId, topicIndex = null) => {
        const course = courses.find(c => c.id === courseId)
        if (!course) return 0

        if (topicIndex !== null) {
            // Topic-level completion
            const topic = course.topics[topicIndex]
            if (!topic || !topic.subtopics || topic.subtopics.length === 0) return 0

            const completed = topic.subtopics.filter((_, idx) =>
                completedSubtopics[`${courseId}-${topicIndex}-${idx}`]
            ).length

            return Math.round((completed / topic.subtopics.length) * 100)
        } else {
            // Course-level completion
            let totalSubtopics = 0
            let completedCount = 0

            course.topics.forEach((topic, tIdx) => {
                if (topic.subtopics) {
                    topic.subtopics.forEach((_, sIdx) => {
                        totalSubtopics++
                        if (completedSubtopics[`${courseId}-${tIdx}-${sIdx}`]) {
                            completedCount++
                        }
                    })
                }
            })

            return totalSubtopics === 0 ? 0 : Math.round((completedCount / totalSubtopics) * 100)
        }
    }

    const filteredCourses = courses.filter(course => {
        if (!searchQuery) return true

        const query = searchQuery.toLowerCase()
        const titleMatch = course.title.toLowerCase().includes(query)
        const topicMatch = course.topics?.some(topic =>
            topic.title.toLowerCase().includes(query)
        )

        return titleMatch || topicMatch
    })

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    courses={filteredCourses}
                    selectedCourse={selectedCourse}
                    selectedTopic={selectedTopic}
                    selectedSubtopic={selectedSubtopic}
                    setSelectedCourse={setSelectedCourse}
                    setSelectedTopic={setSelectedTopic}
                    setSelectedSubtopic={setSelectedSubtopic}
                    isOpen={isSidebarOpen}
                    getCompletionPercentage={getCompletionPercentage}
                />

                <ContentArea
                    selectedCourse={selectedCourse}
                    selectedTopic={selectedTopic}
                    selectedSubtopic={selectedSubtopic}
                    completedSubtopics={completedSubtopics}
                    toggleSubtopicCompletion={toggleSubtopicCompletion}
                    courses={courses}
                />
            </div>
        </div>
    )
}

export default CourseExplorer
