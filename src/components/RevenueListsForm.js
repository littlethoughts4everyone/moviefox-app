function RevenueListsForm({ name, handleNameChange, role, handleRoleChange, getRevenueList }) {

    return (
        <div>
            <div className="form-container">
                <p className="text-shadow">Search for an actor/actress, director, composer or cinematographer to get their movie data list.</p>
                <form onSubmit={getRevenueList}>
                    <input 
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name"
                    aria-label="Name"
                    required />
                    <select 
                    name="Role"
                    value={role}
                    onChange={handleRoleChange}
                    aria-label="Role">
                        <option value="Actor/Actress">Actor/Actress</option>
                        <option value="Director">Director</option>
                        <option value="Composer">Composer</option>
                        <option value="Cinematographer">Cinematographer</option>
                    </select>
                    <button
                    type="submit"
                    aria-label="Find List" >
                        Find List
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RevenueListsForm;