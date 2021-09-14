////////////////////// Begin Profile Page ////////////////////////

// Edit Profile Information
const saveProfileEdit = document.querySelector('#save-profile-edit');
if (saveProfileEdit) {
	saveProfileEdit.addEventListener('click', (e) => {
		e.preventDefault();
        // Build formData object.
        let formData = new FormData();
        formData.append('name_complete', document.querySelector('#full_name').value);
        formData.append('mini_about', document.querySelector('#mini-about').value);
		formData.append('about', document.querySelector('#about').value);
		formData.append('email', document.querySelector('#email').value);
		formData.append('github', document.querySelector('#github').value);
		formData.append('linkedin', document.querySelector('#linkedin').value);
		formData.append('facebook', document.querySelector('#facebook').value);
		formData.append('instagram', document.querySelector('#instagram').value);
		formData.append('twitter', document.querySelector('#twitter').value);
		formData.append('phone', document.querySelector('#phone').value);
		formData.append('cv', document.querySelector('#cv').files[0]);
		
		fetch('/dashboard/profile/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			if (data.success == true) {
				document.querySelector('#change-success').click();
				setTimeout(() => {  location.reload(); }, 3000);
			} else {
				document.querySelector('#form-errors').innerHTML = "* Something's wrong, please check your information!";
			}
		});
	});
}

// Edit Profile Picture
const profilePic = document.querySelector('#profile-pic');
if (profilePic) {
    profilePic.addEventListener('change', () => {
        if (profilePic.length != 0) {
            document.querySelector('#profile-form').submit();
        }
    })
}

//////////////////////// End Profile Page /////////////////////////

////////////////////// Begin Messages Page ////////////////////////

// Remove Message
const deleteMessageBtns = document.querySelectorAll('.delete-message');
if (deleteMessageBtns) {
	deleteMessageBtns.forEach(messageBtn => {
		messageBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let ID = messageBtn.attributes.id.value.split('-')[1]
			let formData = new FormData();
			formData.append('message_id', ID);
			formData.append('option_type', "delete");
			
			fetch('/dashboard/messages/api/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.status == "success") {
					document.querySelector('#row-'+ID).style.display = 'none';
				}
			});
		})
	})
}

// View Message
const viewMessage = document.querySelectorAll('.view-message');
if (viewMessage) {
	viewMessage.forEach(view => {
		view.addEventListener('click', (e) => {
			e.preventDefault();
			let ID = view.attributes.id.value.split('-')[1]
			// Build formData object.
			let formData = new FormData();
			formData.append('message_id', ID);
			formData.append('option_type', "view");
			
			fetch('/dashboard/messages/api/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.status == "success") {
					document.querySelector('#view-'+ID).parentElement.classList.remove('new-message')
				}
			});
		})
	})
}

// Search Message
const messageSearchBtn = document.querySelector('#search-btn');
if (messageSearchBtn) {
	messageSearchBtn.addEventListener('click', (e) => {
		e.preventDefault();
		// Build formData object.
		input = document.querySelector('#search-input').value;
		let formData = new FormData();
		formData.append('search_text', input);
		formData.append('option_type', "search");
		
		fetch('/dashboard/messages/api/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				console.log(data.messages);
			}
		});
	})
}

// Load Message
const loadNewMessages = document.querySelector('#load-more-messages');
if (loadNewMessages) {
	loadNewMessages.addEventListener('click', (e) => {
		e.preventDefault();
		// Build formData object.
		input = document.querySelector('#search-input').value;
		let formData = new FormData();
		formData.append('search_text', input);
		formData.append('option_type', "search");
		
		fetch('/dashboard/messages/api/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				console.log(data.messages);
			}
		});
	})
}

//////////////////////// End Messages Page /////////////////////////

////////////////////// Begin Variables Page ////////////////////////

const title = document.querySelector('#form-title');
const description = document.querySelector('#form-description');
const image = document.querySelector('#form-image');
const tools = document.querySelector('#form-tools');
const demo = document.querySelector('#form-demo');
const github = document.querySelector('#form-github');
const show_in_slider = document.querySelector('#form-show_in_slider');
const the_year = document.querySelector('#form-date')

function showErrors(errors) {
	if (errors.title) {
		title.classList.add('form-error');
	} else {
		title.classList.remove('form-error');
	}
	if (errors.description) {
		description.classList.add('form-error');
	} else {
		description.classList.remove('form-error');
	}
	if (errors.image) {
		image.classList.add('form-error');
	} else {
		image.classList.remove('form-error');
	}
	if (errors.tools) {
		tools.parentElement.classList.add('form-error');
	} else {
		tools.parentElement.classList.remove('form-error');
	}
	if (errors.demo) {
		demo.parentElement.classList.add('form-error');
	} else {
		demo.parentElement.classList.remove('form-error');
	}
	if (errors.github) {
		github.parentElement.classList.add('form-error');
	} else {
		github.parentElement.classList.remove('form-error');
	}
	if (errors.the_year) {
		the_year.parentElement.classList.add('form-error');
	} else {
		the_year.parentElement.classList.remove('form-error');
	}
};

//////////////////////// End Variables Page /////////////////////////

////////////////////// Begin Experiences Page ////////////////////////

// Create Experience
const createExperienceForm = document.querySelectorAll('#display-create-experience-form');
if (createExperienceForm) {
	createExperienceForm.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			form = document.querySelector('.create-experience-form');
			form.classList.toggle('hide');
			document.querySelector('#submit-update-experience').style.display = 'none';
			document.querySelector('#creat-experience-btn').style.display = 'block';
		})
	})
}

// Save Experience
const createExperienceBtn = document.querySelector('#creat-experience-btn');
if (createExperienceBtn) {
	createExperienceBtn.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('type', 'create');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('the_year', the_year.value);

		fetch('/dashboard/experiences/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});
	})
}

// Edit Experience
const editExperienceBtns = document.querySelectorAll('.svg-icon-edit-experience');
if (editExperienceBtns) {
	editExperienceBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', btn.attributes.id.value);
			formData.append('type', 'update');
			formData.append('first', true);
	
			fetch('/dashboard/experiences/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					form = document.querySelector('.create-experience-form');
					form.classList.remove('hide');
					document.querySelector('#creat-experience-btn').style.display = 'none';
					document.querySelector('#submit-update-experience').style.display = 'block';
					experience = data.experience
					title.value = experience.title
					description.value = experience.description
					the_year.value = experience.the_year
					document.querySelector('#experience-id').value = experience.id;
				}
			});

		})
	})
}

// Update Experience
const updateExperienceBtns = document.querySelector('#submit-update-experience');
if (updateExperienceBtns) {
	updateExperienceBtns.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('id', document.querySelector('#experience-id').value);
		formData.append('type', 'update');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('the_year', the_year.value);

		fetch('/dashboard/experiences/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});

	})
}

// Remove Experience
const removeExperienceBtns = document.querySelectorAll(".svg-icon-delete-experience");
if (removeExperienceBtns) {
	removeExperienceBtns.forEach(removeBtn => {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', removeBtn.attributes.id.value);
			formData.append('type', 'delete');

			fetch('/dashboard/experiences/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					location.reload();
				} else {
					console.log('error');
				}
			});
		})
	})
}

//////////////////////// End Experiences Page /////////////////////////

////////////////////// Begin Achievements Page ////////////////////////

// Create Achievement
const createAchievementForm = document.querySelectorAll('#display-create-achievement-form');
if (createAchievementForm) {
	createAchievementForm.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			form = document.querySelector('.create-achievement-form');
			form.classList.toggle('hide');
			document.querySelector('#submit-update-achievement').style.display = 'none';
			document.querySelector('#creat-achievement-btn').style.display = 'block';
		})
	})
}

// Save Achievement
const createAchievementBtn = document.querySelector('#creat-achievement-btn');
if (createAchievementBtn) {
	createAchievementBtn.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('type', 'create');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('the_year', the_year.value);

		fetch('/dashboard/achievements/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});
	})
}

// Edit Achievement
const editAchievementBtns = document.querySelectorAll('.svg-icon-edit-achievement');
if (editAchievementBtns) {
	editAchievementBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', btn.attributes.id.value);
			formData.append('type', 'update');
			formData.append('first', true);
	
			fetch('/dashboard/achievements/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					form = document.querySelector('.create-achievement-form');
					form.classList.remove('hide');
					document.querySelector('#creat-achievement-btn').style.display = 'none';
					document.querySelector('#submit-update-achievement').style.display = 'block';
					achievement = data.achievement
					title.value = achievement.title
					description.value = achievement.description
					the_year.value = achievement.the_year
					document.querySelector('#achievement-id').value = achievement.id;
				}
			});

		})
	})
}

// Update Achievement
const updateAchievementBtns = document.querySelector('#submit-update-achievement');
if (updateAchievementBtns) {
	updateAchievementBtns.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('id', document.querySelector('#achievement-id').value);
		formData.append('type', 'update');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('the_year', the_year.value);

		fetch('/dashboard/achievements/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});

	})
}

// Remove Achievement
const removeAchievementBtns = document.querySelectorAll(".svg-icon-delete-achievement");
if (removeAchievementBtns) {
	removeAchievementBtns.forEach(removeBtn => {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', removeBtn.attributes.id.value);
			formData.append('type', 'delete');

			fetch('/dashboard/achievements/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					location.reload();
				} else {
					console.log('error');
				}
			});
		})
	})
}

//////////////////////// End Achievements Page /////////////////////////

////////////////////// Begin Skills Page ////////////////////////

// Create Skill
const createSkillForm = document.querySelectorAll('#display-create-skill-form');
if (createSkillForm) {
	createSkillForm.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			form = document.querySelector('.create-skill-form');
			form.classList.toggle('hide');
			document.querySelector('#submit-update-skill').style.display = 'none';
			document.querySelector('#creat-skill-btn').style.display = 'block';
		})
	})
}

// Save Skill
const createSkillBtn = document.querySelector('#creat-skill-btn');
if (createSkillBtn) {
	createSkillBtn.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('type', 'create');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('image', image.files[0]);

		fetch('/dashboard/skills/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});
	})
}

// Edit Skill
const editSkillBtns = document.querySelectorAll('.svg-icon-edit-skill');
if (editSkillBtns) {
	editSkillBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', btn.attributes.id.value);
			formData.append('type', 'update');
			formData.append('first', true);
	
			fetch('/dashboard/skills/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					form = document.querySelector('.create-skill-form');
					form.classList.remove('hide');
					document.querySelector('#creat-skill-btn').style.display = 'none';
					document.querySelector('#submit-update-skill').style.display = 'block';
					skill = data.skill
					title.value = skill.title
					description.value = skill.description
					document.querySelector('#skill-id').value = skill.id;
				}
			});

		})
	})
}

// Update Skill
const updateSkillBtns = document.querySelector('#submit-update-skill');
if (updateSkillBtns) {
	updateSkillBtns.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('id', document.querySelector('#skill-id').value);
		formData.append('type', 'update');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('image', image.files[0]);

		fetch('/dashboard/skills/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});

	})
}

// Remove Skill
const removeSkillBtns = document.querySelectorAll(".svg-icon-delete-skill");
if (removeSkillBtns) {
	removeSkillBtns.forEach(removeBtn => {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', removeBtn.attributes.id.value);
			formData.append('type', 'delete');

			fetch('/dashboard/skills/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					location.reload();
				} else {
					console.log('error');
				}
			});
		})
	})
}

//////////////////////// End Skills Page /////////////////////////

////////////////////// Begin Projects Page ////////////////////////

// Create Project
const createProjectForm = document.querySelectorAll('#display-create-project-form');
if (createProjectForm) {
	createProjectForm.forEach(btn => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			form = document.querySelector('.create-project-form');
			form.classList.toggle('hide');
			document.querySelector('#submit-update-project').style.display = 'none';
			document.querySelector('#creat-project-btn').style.display = 'block';
		})
	})
}

// Save Project
const createProjectBtn = document.querySelector('#creat-project-btn');
if (createProjectBtn) {
	createProjectBtn.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('type', 'create');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('image', image.files[0]);
		formData.append('tools', tools.value);
		formData.append('demo', demo.value);
		formData.append('github', github.value);
		formData.append('show_in_slider', show_in_slider.checked);

		fetch('/dashboard/projects/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});
	})
}

// Edit Project
const editProjectBtns = document.querySelectorAll('.svg-icon-edit-project');
if (editProjectBtns) {
	editProjectBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', btn.attributes.id.value);
			formData.append('type', 'update');
			formData.append('first', true);
	
			fetch('/dashboard/projects/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					form = document.querySelector('.create-project-form');
					form.classList.remove('hide');
					document.querySelector('#creat-project-btn').style.display = 'none';
					document.querySelector('#submit-update-project').style.display = 'block';
					project = data.project
					title.value = project.title
					description.value = project.description
					tools.value = project.tools
					demo.value = project.demo
					github.value = project.github
					show_in_slider.checked = project.show_in_slider;
					document.querySelector('#project-id').value = project.id;
				}
			});

		})
	})
}

// Update Project
const updateProjectBtns = document.querySelector('#submit-update-project');
if (updateProjectBtns) {
	updateProjectBtns.addEventListener('click', (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('id', document.querySelector('#project-id').value);
		formData.append('type', 'update');

		formData.append('title', title.value);
		formData.append('description', description.value);
		formData.append('image', image.files[0]);
		formData.append('tools', tools.value);
		formData.append('demo', demo.value);
		formData.append('github', github.value);
		formData.append('show_in_slider', show_in_slider.value);

		fetch('/dashboard/projects/edit/', {
			body: formData,
			method: "post",
			credentials: 'same-origin',
			headers: {
				"X-CSRFToken": csrftoken
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.code == 200) {
				location.reload();
			} else {
				showErrors(data.errors);
			}
		});

	})
}

// Remove Project
const removeProjectBtns = document.querySelectorAll(".svg-icon-delete-project");
if (removeProjectBtns) {
	removeProjectBtns.forEach(removeBtn => {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault()
			let formData = new FormData();
			formData.append('id', removeBtn.attributes.id.value);
			formData.append('type', 'delete');

			fetch('/dashboard/projects/edit/', {
				body: formData,
				method: "post",
				credentials: 'same-origin',
				headers: {
					"X-CSRFToken": csrftoken
				}
			})
			.then(response => response.json())
			.then(data => {
				if(data.code == 200) {
					location.reload();
				} else {
					console.log('error');
				}
			});
		})
	})
}

//////////////////////// End Projects Page /////////////////////////