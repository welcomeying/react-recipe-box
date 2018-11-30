import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

// Clear localStorage
// localStorage.clear();
const recipes = [
{name:"Beef and Broccoli", 
 ingredients:["2 tablespoons cornstarch", "4 tablespoons soy sauce", "2 teaspoons sugar", "5 tablespoons peanut oil", "1 pound flank steak, thinly sliced against the grain", "1 tablespoon oyster sauce", "1 1/4 cups low-sodium chicken broth", "4 thin slices peeled ginger", "1 head broccoli, cut into florets", "1 large onion, halved and sliced 1/2 inch thick", "3 plum tomatoes, quartered lengthwise", "2 cloves garlic, minced", "Cooked white rice, for serving (optional)"], 
 directions:["Whisk 1 tablespoon cornstarch, 3 tablespoons soy sauce, 1 teaspoon sugar and 1 tablespoon peanut oil in a large bowl. Add the steak and toss to coat; refrigerate until ready to cook.", "Whisk the remaining 1 tablespoon each cornstarch and soy sauce, the oyster sauce and chicken broth in a small bowl; set aside.", "Heat 1 tablespoon peanut oil in a large skillet over high heat. Add the ginger, broccoli and the remaining 1 teaspoon sugar and stir-fry 3 to 4 minutes; transfer to a plate. Heat 1 more tablespoon peanut oil in the skillet, add the onion and stir-fry 2 to 3 minutes. Add the tomatoes and cook, turning gently, 2 minutes. Transfer the onion and tomatoes to the plate with the broccoli.", "Reduce the heat to medium high; add the remaining 2 tablespoons peanut oil to the skillet. Add the garlic and steak and stir-fry 1 minute. Whisk the sauce mixture, then add to the skillet and simmer 1 minute. Return the vegetables to the skillet; cook until the meat is cooked through, 3 to 4 minutes. Serve with rice, if desired."]},
{name:"Vegetable Chow Mein",
ingredients:["8 ounces Chinese long beans or green beans, cut into 1/2 to 1-inch pieces to yield about 2 cups", "2 large carrots, peeled, trimmed and cut into matchstick-size pieces", "8 ounces fresh or dried chow mein noodles", "3 tablespoons vegetable oil", "1 (2-inch) piece fresh ginger, peeled and minced", "3 garlic cloves, minced", "6 large shiitake mushrooms, thinly sliced", "1 (8-ounce) can sliced water chestnuts, rinsed and drained", "1/4 cup low-sodium chicken broth", "1/2 cup hoisin sauce", "2 tablespoons soy sauce", "2 tablespoons honey", "Kosher salt and freshly ground black pepper", "2 green onions, thinly sliced"],
directions:["Bring a large pot of salted water to a boil over high heat. Add the beans and carrots and cook for 1 minute. Drain and put in a bowl of iced water until cool, about 1 minute. Drain and set aside.", "Return the water to a boil. Add the noodles and cook, stirring occasionally, until tender, about 5 to 7 minutes. Drain and rinse with cold water. Pat dry and set aside.", "In a large nonstick skillet, heat the oil over high heat. Add the noodles, ginger and garlic. Cook for 2 minutes until the noodles are lightly browned. Add the mushrooms, beans, carrots, and water chestnuts and cook for 3 minutes. Add the broth, hoisin sauce, soy sauce, and honey. Bring the mixture to a boil and stir until slightly reduced and thick, about 2 minutes. Season with salt and pepper, to taste.", "Transfer the chow mein to a large bowl and garnish with the green onions before serving."]},
{name:"Kung Pao Chicken",
ingredients:["1/4 cup soy sauce", "2 tablespoons brown sugar ", "2 tablespoons minced ginger ", "1 tablespoon sherry ", "1 tablespoon sriracha ", "1 tablespoon cornstarch mixed with 3 tablespoons water", "2 teaspoons rice wine vinegar ", "2 cloves garlic, minced", "2 tablespoons peanut oil ", "8 dried Asian chile peppers, snipped into small pieces ", "6 boneless, skinless chicken thighs, diced small ", "2 stalks celery, very finely sliced ", "1 large red bell pepper, cut into large chunks ", "1/2 cup unsalted peanuts ", "Cooked lo mein or chow mein noodles, for serving", "2 green onions, sliced"],
directions:["Begin by mixing the sauce ingredients together: Combine the soy sauce, brown sugar, ginger, sherry, sriracha, cornstarch slurry, rice wine vinegar and garlic in a bowl.", "Heat the peanut oil over high heat in a large skillet. Drop in the chiles and cook, stirring, for 30 seconds to release the heat. Add the chicken and fry until cooked through, 5 to 6 minutes. Remove the chicken from the skillet. Add the celery and red pepper and cook for 1 minute, then return the chicken to the skillet. Pour in the sauce mixture and cook until the sauce has thickened, a couple of minutes. Add the peanuts and toss together.", "Serve over noodles and garnish with sliced green onions."]}];

// If user's localRecipes does not exist, load 'recipes' to user's localRecipes
const localStorageKey = 'welying_localRecipes';
if (!localStorage.getItem(localStorageKey)) {
	localStorage.setItem(localStorageKey, JSON.stringify(recipes));
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: JSON.parse(localStorage.getItem(localStorageKey)),
			currentIndex: 0,
			showEditDialog: false,
			showAddDialog: false
		};
		this.setCurrent = this.setCurrent.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
	}
	//load the local storage data after the component renders
	// componentDidMount() {
	// 	this.setState( {
	// 		recipes: JSON.parse(localStorage.getItem(localStorageKey)),
	// 		currentIndex: 0
	// 	});
	// }

	setCurrent(e) {
		let currentRecipe = e.target.innerText;
		let recipes = this.state.recipes;
		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i].name.toLowerCase() === currentRecipe.toLowerCase()) {
				this.setState( {
					currentIndex: i
				});
				break;
			}
		}
	}
	editRecipe(e) {
		let recipes = this.state.recipes;
		let newRecipe = {
			name: document.getElementById('editName').value,
			ingredients: document.getElementById('editIngredients').value.split('\\'),
			directions: document.getElementById('editDirections').value.split('\\')
		};
		recipes[this.state.currentIndex] = newRecipe;
		localStorage.setItem(localStorageKey, JSON.stringify(recipes));
		this.setState({
			recipes: recipes,
			showEditDialog: false
		});
	}
	deleteRecipe(e) {
		if (window.confirm('Are you sure you want to delete ' + e.currentTarget.value + ' from the Receipt Box?')) {
			let recipes = this.state.recipes;
			recipes.splice(this.state.currentIndex, 1)
			localStorage.setItem(localStorageKey, JSON.stringify(recipes));
			this.setState({
				recipes: recipes,
				currentIndex: 0,
				showEditDialog: false
			});
		}
	}
	addRecipe() {
		let recipes = this.state.recipes;
		let recipeNames = [];
		recipes.map(item => recipeNames.push(item.name.toLowerCase()));
		let newRecipe = {
			name: document.getElementById('newName').value,
			ingredients: document.getElementById('newIngredients').value.split('\\'),
			directions: document.getElementById('newDirections').value.split('\\')
		};
		if (!newRecipe.name) {
			alert('Your recipe must have a name!');
		}
		else if (recipeNames.indexOf(newRecipe.name.toLowerCase()) !== -1) {
			alert(newRecipe.name +' has already been added to the Recipe Box!');
		}
		else{
			recipes.push(newRecipe);
			localStorage.setItem(localStorageKey, JSON.stringify(recipes));
			this.setState({
				recipes: recipes,
				showAddDialog: false
			});
		}
	}
	toggleDialog(e) {
		if (e.target.title === 'Edit Recipe') {
			this.setState({
				showEditDialog: !this.state.showEditDialog
			})		
		}
		else if (e.target.title === 'Add Recipe') {
			this.setState({
				showAddDialog: !this.state.showAddDialog
			})		
		}
		else if (e.target.title === 'Close') {
			this.setState({
				showAddDialog: false,
				showEditDialog: false
			})		
		}
	}
	render() {
		let renderNames = this.state.recipes.map(item => <li onClick={this.setCurrent}>{item.name}</li>)
		return(
			<div className='container'>
				<h1>RECIPE BOX</h1>
				<div className='recipe-menu'>
					<ul>
						{renderNames}
					</ul>
					<button title='Add Recipe' onClick={this.toggleDialog} className='btn add-btn'>Add Recipe</button>
				</div>
				<RecipeDisplay 
					current={this.state.recipes[this.state.currentIndex]}
					handleEdit={this.toggleDialog}
					handleDelete={this.deleteRecipe} />
																							 
				<AddDialog
					showDialog={this.state.showAddDialog}
					handleSave={this.addRecipe}
					handleClose={this.toggleDialog}
					className='dialog' />
				
				<EditDialog 
					showDialog={this.state.showEditDialog}
					current={this.state.recipes[this.state.currentIndex]}
					handleSave={this.editRecipe}
					handleClose={this.toggleDialog}
					className='dialog' />
			</div>
		);
	}
}

class RecipeDisplay extends React.Component {
	render() {
		let id = this.props.current.name.toLowerCase().split(' ').join('-');
		let renderIngredients = this.props.current.ingredients.map(item => <li>{item}</li>);
		let renderDirections = this.props.current.directions.map(item => <li>{item}</li>);
		return(
			<div id={id} className="recipe-display">
				<h2>{this.props.current.name}</h2>
				<h3>Ingredients</h3>
				<ul id='ingredients-list'>
					{renderIngredients}
				</ul>
				<h3>Directions</h3>
				<ul id='directions-list'>
					{renderDirections}
				</ul>
				<button title='Edit Recipe' onClick={this.props.handleEdit} className='btn edit-btn' >Edit</button>
				<button onClick={this.props.handleDelete} value={this.props.current.name} className='btn btn-danger'>Delete</button>
			</div>
		);
	}
}

class AddDialog extends React.Component {
	// render AddDialog box after clicking 'Add' button
	render() {
		let dialogBox;
		if (this.props.showDialog) {
			dialogBox = (
				<div className='dialog-container'>
					<div className='dialog-box'>
						<h2>Add Recipe</h2>
						<h3>Recipe Name</h3>
						<textarea className='new-name' id='newName' placeholder="Enter name" required></textarea>
						<h3>Ingredients</h3>
						<textarea id="newIngredients" placeholder="Enter ingredients (separate by '\')" required></textarea>
						<h3>Directions</h3>
						<textarea id="newDirections" placeholder="Enter directions (separate by '\')" required></textarea>
						<button onClick={this.props.handleSave} className='btn save-btn'>Save</button>
						<button title='Add Recipe' onClick={this.props.handleClose} className='btn btn-secondary'>Cancel</button>
						<i title='Close' onClick={this.props.handleClose} className='corner-close fa fa-times'/>
					</div>
				</div>
			)
		}
		return (
			<div>
				{dialogBox}
			</div>
		)
	}
}

class EditDialog extends React.Component {
	// render EditDialog box after clicking 'Edit' button
	render() {
		let dialogBox;
		if (this.props.showDialog) {
			dialogBox = (
				<div className='dialog-container'>
					<div className='dialog-box'>
						<h2>Edit Recipe</h2>
						<h3>Recipe Name</h3>
						<textarea className='new-name' id="editName" placeholder="Enter name" required>{this.props.current.name}</textarea>
						<h3>Ingredients</h3>
						<textarea id="editIngredients" placeholder="Enter ingredients (separate by '\')" required>{this.props.current.ingredients.join('\\')}</textarea>
						<h3>Directions</h3>
						<textarea id="editDirections" placeholder="Enter directions (separate by '\')" required>{this.props.current.directions.join('\\')}</textarea>
						<button onClick={this.props.handleSave} className='btn save-btn'>Save</button>
						<button title='Edit Recipe' onClick={this.props.handleClose} className='btn btn-secondary'>Cancel</button>
						<i title='Close' onClick={this.props.handleClose} className='corner-close fa fa-times'/>
					</div>
				</div>
			)
		}
		return (
			<div>
				{dialogBox}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

