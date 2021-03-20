import { makeRequest } from 'core/utils/Request';
import React, { useState } from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss'

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>(
        {
            name: '',
            price: '',
            category: '',
            description: ''
        });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));

        console.log({ name, value })
    }




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...formData,
            imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_627914-MLA40655732617_022020-O.jpg',
            categories: [{ id: formData.category }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload })
    }
    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">

                <div className="row">

                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select
                            name="category"
                            onChange={handleOnChange}
                            className="form-control mb-5"
                            value={formData.category}
                        >
                            <option value="1">livros</option>
                            <option value="3">computadores</option>
                            <option value="2">eletronicos</option>
                        </select>

                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"

                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30}
                            rows={10}></textarea>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;