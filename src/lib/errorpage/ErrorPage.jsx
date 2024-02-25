

const ErrorPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Error 404</h1>
            <p style={styles.message}>Page not found</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        fontSize: '3rem',
        color: '#ff0000',
    },
    message: {
        fontSize: '1.5rem',
        marginTop: '1rem',
    },
};

export default ErrorPage;
