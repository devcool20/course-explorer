import ReactMarkdown from 'react-markdown'

function ContentArea({
    selectedCourse,
    selectedTopic,
    selectedSubtopic,
    completedSubtopics,
    toggleSubtopicCompletion,
    courses
}) {
    const renderBreadcrumbs = () => {
        if (!selectedCourse) return null

        return (
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>{selectedCourse.title}</li>
                    {selectedTopic && (
                        <>
                            <li>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li>{selectedTopic.title}</li>
                        </>
                    )}
                    {selectedSubtopic && (
                        <>
                            <li>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li className="text-gray-900 dark:text-gray-100 font-medium">{selectedSubtopic.title}</li>
                        </>
                    )}
                </ol>
            </nav>
        )
    }

    const renderContent = () => {
        // Subtopic selected - show subtopic content
        if (selectedSubtopic && selectedTopic && selectedCourse) {
            const isCompleted = completedSubtopics[
                `${selectedCourse.id}-${selectedTopic.index}-${selectedSubtopic.index}`
            ]

            return (
                <div>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {selectedSubtopic.title}
                            </h1>
                        </div>
                        <button
                            onClick={() => toggleSubtopicCompletion(
                                selectedCourse.id,
                                selectedTopic.index,
                                selectedSubtopic.index
                            )}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isCompleted
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                            <svg
                                className="w-5 h-5"
                                fill={isCompleted ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                    </div>

                    <div className="markdown-content prose prose-slate dark:prose-invert max-w-none">
                        <ReactMarkdown>{selectedSubtopic.content}</ReactMarkdown>
                    </div>
                </div>
            )
        }

        // Topic selected - show topic overview
        if (selectedTopic && selectedCourse) {
            const topic = selectedCourse.topics[selectedTopic.index]

            return (
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {topic.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        {topic.description}
                    </p>

                    {topic.subtopics && topic.subtopics.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Subtopics
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {topic.subtopics.map((subtopic, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                                    >
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                                            {subtopic.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {subtopic.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        // Course selected - show course overview
        if (selectedCourse) {
            return (
                <div>
                    <div className="mb-8">
                        {selectedCourse.coverImageUrl && (
                            <img
                                src={selectedCourse.coverImageUrl}
                                alt={selectedCourse.title}
                                className="w-full h-64 object-cover rounded-lg mb-6"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        )}
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {selectedCourse.title}
                        </h1>
                        {selectedCourse.subtitle && (
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                                {selectedCourse.subtitle}
                            </p>
                        )}
                        {selectedCourse.description && (
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                {selectedCourse.description}
                            </p>
                        )}
                    </div>

                    {selectedCourse.learningObjectives && selectedCourse.learningObjectives.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Learning Objectives
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                {selectedCourse.learningObjectives.map((objective, index) => (
                                    <li key={index}>{objective}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedCourse.topics && selectedCourse.topics.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Topics
                            </h2>
                            <div className="grid gap-4">
                                {selectedCourse.topics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                                    >
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                                            {topic.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            {topic.description}
                                        </p>
                                        {topic.subtopics && (
                                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                                {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        // Nothing selected - show welcome message
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <svg
                        className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Welcome to Course Explorer
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Select a course from the sidebar to get started
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main
            className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 p-8"
            role="main"
        >
            {renderBreadcrumbs()}
            {renderContent()}
        </main>
    )
}

export default ContentArea
