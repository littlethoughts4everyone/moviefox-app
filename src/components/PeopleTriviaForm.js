
function PeopleTriviaForm({ formInput, handleNameChange, role, handleRoleChange, getPeopleTrivia }) {

    return (
        <div>
            <div className="form-container">
                <p className="text-shadow">Search for an actor/actress, director, composer or cinematographer to get a graph of their films genres and movie studios.</p>
                <form onSubmit={getPeopleTrivia}>
                    <input 
                    type="text"
                    value={formInput}
                    onChange={handleNameChange}
                    placeholder="Name"
                    aria-label="Name"
                    required />
                    <select 
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
                        Find Trivia
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PeopleTriviaForm;