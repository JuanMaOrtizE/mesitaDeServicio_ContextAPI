import { useReducer } from "react";

function getInitialFormData(initialTicket, customers, categories) {
  if (initialTicket) {
    return {
      title: initialTicket.title,
      description: initialTicket.description,
      priority: initialTicket.priority,
      customerId: String(initialTicket.customerId),
      categoryId: String(initialTicket.categoryId),
    };
  }

  return {
    title: "",
    description: "",
    priority: "medium",
    customerId: String(customers[0].id),
    categoryId: String(categories[0].id),
  };
}

function ticketFormReducer(state, action) {
  switch (action.type) {
    case "fieldChanged":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };

    case "formErrorSet":
      return { ...state, formError: action.payload };

    case "formReset":
      return {
        formData: action.payload,
        formError: "",
      };

    default:
      return state;
  }
}

function TicketForm({
  customers,
  categories,
  onSubmitTicket,
  initialTicket,
  onCancelEdit,
}) {
  const [state, dispatch] = useReducer(ticketFormReducer, {
    formData: getInitialFormData(initialTicket, customers, categories),
    formError: "",
  });

  const { formData, formError } = state;

  function handleChange(e) {
    const { name, value } = e.target;

    dispatch({ type: "fieldChanged", payload: { name, value } });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title || !description) {
      dispatch({
        type: "formErrorSet",
        payload: "El título y la descripción son obligatorias.",
      });

      return;
    }

    const draft = {
      title,
      description,
      priority: formData.priority,
      customerId: formData.customerId,
      categoryId: formData.categoryId,
    };

    onSubmitTicket(draft);

    dispatch({
      type: "formReset",
      payload: getInitialFormData(null, customers, categories),
    });
  }

  const labelClass = "text-sm font-medium text-slate-700";
  const fieldClass =
    "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500";

  return (
    <form
      className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        {initialTicket ? "Editar ticket" : "Crear nuevo ticket"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="title">
            Título
          </label>
          <input
            className={fieldClass}
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="priority">
            Prioridad
          </label>
          <select
            className={fieldClass}
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

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">
            Descripción
          </label>
          <textarea
            className="mt-1 min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3
                      py-2 text-sm text-slate-900 shadow-sm focus:border-gray-500 focus:outline-none
                      focus:ring-2 focus:ring-gray-500"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="customerId">
            Cliente
          </label>
          <select
            className={fieldClass}
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
          <label className={labelClass} htmlFor="categoryId">
            Categoría
          </label>
          <select
            className={fieldClass}
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
      </div>

      {formError && (
        <p
          className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {formError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
          type="submit"
        >
          {initialTicket ? "Guardar cambios" : "Crear ticket"}
        </button>
        {initialTicket ? (
          <button
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 cursor-pointer"
            type="button"
            onClick={() => onCancelEdit()}
          >
            Cancelar edición
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default TicketForm;
