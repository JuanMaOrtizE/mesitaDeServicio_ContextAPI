import { useState } from "react";

function TicketForm({ customers, categories, onCreateTicket }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    customerId: String(customers[0].id),
    categoryId: String(categories[0].id),
  });

  const [formError, setFormError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title || !description) {
      setFormError("El título y la descripción son obligatorias.");
      return;
    }

    const draft = {
      title,
      description,
      priority: formData.priority,
      customerId: Number(formData.customerId),
      categoryId: Number(formData.categoryId),
    };

    onCreateTicket(draft);

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      customerId: String(customers[0].id),
      categoryId: String(categories[0].id),
    });
    setFormError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="priority">Prioridad</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div>
        <label htmlFor="customerId">Cliente</label>
        <select
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="categoryId">Categoría</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {formError && <p role="alert">{formError}</p>}

      <button type="submit">Crear ticket</button>
    </form>
  );
}

export default TicketForm;
