
function PeopleTriviaForm({ name, handleNameChange, role, handleRoleChange, getPeopleTrivia }) {

    return (
        <div>
            <div className="form-container">
                <p>Type in the name of an actor/actress, director, composer or cinematographer to get some trivia about them.</p>
                <form onSubmit={getPeopleTrivia}>
                    <input 
                    type="text"
                    value={name}
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