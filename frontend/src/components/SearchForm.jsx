import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/searchform.module.css';

export default function SearchForm(props) {
    const { register, handleSubmit, reset } = useForm();

    function onClearClick() {
        reset();
        props.clearResults();
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit((data) => {
            props.search(data.name, data.manufacturer, data.crew, data.symmetric, data.asymmetric, data.trapeze);
    })}>
            <div className={styles.formRow}>
                <div className={styles.formElement}>
                    <label htmlFor="name">Class name:</label>
                    <input type="text"
                        name="name"
                        placeholder="Class name"
                        {...register("name")}/>
                </div>
                    <div className={styles.formElement}>
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <input type="text"
                        name="manufacturer"
                        placeholder="Manufacturer"
                        {...register("manufacturer")}/>
                </div>
                    <div className={styles.formElement}>
                    <label htmlFor="crew">Number of crew:</label>
                    <input type="number"
                        name="crew"
                        placeholder="Crew"
                        {...register("crew")}/>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.formElement}>
                    <input type="checkbox"
                        name="symmetric"
                        {...register("symmetric")} />
                    <label className={styles.checkboxText} htmlFor="symmetric">Symmetric spinnaker</label>
                </div>
                    <div className={styles.formElement}>
                    <input type="checkbox"
                        name="asymmetric"
                        {...register("asymmetric")} />
                    <label className={styles.checkboxText} l htmlFor="asymmetric">Asymmetric spinnaker</label>
                </div>
                    <div className={styles.formElement}>
                    <input type="checkbox"
                        name="trapeze"
                        {...register("trapeze")}/>
                    <label className={styles.checkboxText} htmlFor="trapeze">Trapeze</label>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.formElement}>
                    <input type="submit" value="Search"/>
                    <input type="button" value="Clear" onClick={onClearClick} />
                </div>
            </div>
        </form>
    )
}
