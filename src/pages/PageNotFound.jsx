import styles from "./PageNotFound.module.css"

function PageNotFound() {
    return (
        <div className={styles.error}>
            <p>
                Page Not Found !
            </p>
        </div>
    )
}

export default PageNotFound