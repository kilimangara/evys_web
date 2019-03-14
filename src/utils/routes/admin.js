const routes = [
    {
        match: '/admin/subjects',
        exact: true,
        strict: false,
        backButton: false,
        title: 'Курсы'
    },
    {
        match: '/admin/subjects/:subjectId',
        exact: false,
        strict: false,
        backButton: false,
        title: 'Курс'
    },
    {
        match: '/admin/subjects',
        exact: false,
        strict: false,
        backButton: false,
        title: 'Курсы'
    }
]

export default routes
