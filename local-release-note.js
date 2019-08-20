/**
 * Classe que interpreta e formata o JSON informando
 * as informações envolvendo a release.
 * 
 * @since 2019/07
 */
class LocalReleaseNote extends HTMLElement {
	
	constructor() {
		super();
		this.transformSystemName();
		this.transformDescription();
		this.transformReleases();
	}

	transformSystemName(){
		this.transformTag("name", "h2");
	}

	transformDescription(){
		this.transformTag("description", "p");
	}

	transformReleases(){
		const releases = this.transformTag("releases", "div", "row");

		for (let i = 0; i < releases.children.length; i++){
			const isFirst = (i === 0);

			const release = this.transformTag("release", "div", "card" + (isFirst ? " last-update" : ""));
			this.transformTag("version", "h3");
			this.transformTag("description", "p");
			
			const column = document.createElement('div');
			column.className = "column";
			column.appendChild(release);
			releases.appendChild(column);
		}
	}

	transformTag(oldTag, newTag, className = null){
		const component = document.getElementsByTagName(oldTag)[0];
		const text = component.innerHTML;

		const newElement = document.createElement(newTag);
		newElement.innerHTML = text;
		if(className != null){
			newElement.className = className;
		}
		component.parentNode.replaceChild(newElement, component);
		return newElement;
	}
	
}

customElements.define('local-release', LocalReleaseNote);