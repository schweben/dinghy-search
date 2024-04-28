import React from 'react';
import { useForm } from 'react-hook-form';

export default function SearchForm(props) {
    const { register, handleSubmit, formState } = useForm();

    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                props.search(data.name, data.manufacturer, data.crew, data.symmetric, data.asymmetric, data.trapeze);
        })}>
                <label htmlFor="name">Class name</label>
                <input type="text"
                    name="name"
                    placeholder="Class name"
                    {...register("name")}/>
                <label htmlFor="manufacturer">Manufacturer</label>
                <input type="text"
                    name="manufacturer"
                    placeholder="Manufacturer"
                    {...register("manufacturer")}/>
                <input type="number"
                    name="crew"
                    placeholder="Crew"
                    {...register("crew")}/>
                <label htmlFor="symmetric">Symmetric spinnaker</label>
                <input type="checkbox"
                    name="symmetric"
                    {...register("symmetric")} />
                <label htmlFor="asymmetric">Asymmetric spinnaker</label>
                <input type="checkbox"
                    name="asymmetric"
                    {...register("asymmetric")} />
                <label htmlFor="trapeze">Trapeze</label>
                <input type="checkbox"
                    name="trapeze"
                    {...register("trapeze")}/>
                <input type="submit" value="Search"/>
            </form>

        </div>
    )
}