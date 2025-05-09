// Candidate Portal Functions

// Job Search Function with Filters
function initializeJobSearch() {
  const jobSearchForm = document.getElementById('job-search-form');
  const jobListings = document.getElementById('job-listings');
  const filterSkills = document.getElementById('filter-skills');
  const filterLocation = document.getElementById('filter-location');
  const filterSalary = document.getElementById('filter-salary');
  const filterJobType = document.getElementById('filter-job-type');

  if (jobSearchForm) {
    jobSearchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = document.getElementById('job-search-input').value.toLowerCase();
      
      // Simulate search with loading state
      if (jobListings) {
        jobListings.innerHTML = '<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>';
        
        setTimeout(() => {
          displayFilteredJobs(searchInput);
          showToast('Search complete! Found matching jobs.', 'success');
        }, 1000);
      }
    });
  }

  // Apply filters
  if (filterSkills || filterLocation || filterSalary || filterJobType) {
    const filterElements = [filterSkills, filterLocation, filterSalary, filterJobType];
    filterElements.forEach(filter => {
      if (filter) {
        filter.addEventListener('change', function() {
          const searchInput = document.getElementById('job-search-input')?.value.toLowerCase() || '';
          displayFilteredJobs(searchInput);
        });
      }
    });
  }
}

function displayFilteredJobs(searchInput) {
  const jobListings = document.getElementById('job-listings');
  if (!jobListings) return;
  
  // Sample jobs data - in a real app this would come from an API
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA (Remote)',
      matchPercentage: 95,
      postedDays: 2,
      skills: ['React', 'TypeScript', 'UI/UX'],
      salary: '120K - 150K',
      logo: 'https://logo.clearbit.com/microsoft.com'
    },
    {
      title: 'Full Stack Developer',
      company: 'Innovate Solutions',
      location: 'Boston, MA (Hybrid)',
      matchPercentage: 92,
      postedDays: 7,
      skills: ['Node.js', 'React', 'MongoDB'],
      salary: '100K - 130K',
      logo: 'https://logo.clearbit.com/amazon.com'
    },
    {
      title: 'UX/UI Designer',
      company: 'DesignForward',
      location: 'Remote (Worldwide)',
      matchPercentage: 87,
      postedDays: 3,
      skills: ['Figma', 'UI Design', 'User Research'],
      salary: '90K - 110K',
      logo: 'https://logo.clearbit.com/adobe.com'
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'Seattle, WA (On-site)',
      matchPercentage: 83,
      postedDays: 5,
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      salary: '130K - 160K',
      logo: 'https://logo.clearbit.com/google.com'
    },
    {
      title: 'Data Scientist',
      company: 'AnalyticsPro',
      location: 'New York, NY (Hybrid)',
      matchPercentage: 78,
      postedDays: 1,
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      salary: '115K - 140K',
      logo: 'https://logo.clearbit.com/ibm.com'
    }
  ];
  
  // Filter jobs based on search input and filters
  const filteredJobs = jobs.filter(job => {
    // Search text filtering
    const matchesSearch = 
      job.title.toLowerCase().includes(searchInput) || 
      job.company.toLowerCase().includes(searchInput) ||
      job.location.toLowerCase().includes(searchInput) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchInput));
    
    // More filters could be applied here in a real application
    return matchesSearch;
  });
  
  // Display results
  if (filteredJobs.length === 0) {
    jobListings.innerHTML = '<div class="text-center py-8 text-gray-500">No matching jobs found. Try adjusting your search criteria.</div>';
    return;
  }
  
  let jobsHTML = '';
  filteredJobs.forEach(job => {
    let matchClass = 'bg-green-100 text-green-800';
    if (job.matchPercentage < 80) {
      matchClass = 'bg-yellow-100 text-yellow-800';
    }
    
    const skillsHTML = job.skills.map(skill => 
      `<span class="skill-tag text-xs px-2 py-1 rounded-full">${skill}</span>`
    ).join('');
    
    jobsHTML += `
      <div class="border border-gray-200 rounded-lg p-4 job-card transition-all duration-200">
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <img src="${job.logo}" alt="${job.company} Logo" class="w-12 h-12 rounded object-cover">
            <div>
              <h3 class="font-semibold">${job.title}</h3>
              <div class="text-gray-600 text-sm">${job.company}</div>
              <div class="text-gray-500 text-sm">${job.location}</div>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span class="${matchClass} text-xs px-2 py-1 rounded-full">${job.matchPercentage}% Match</span>
            <span class="text-gray-500 text-xs mt-2">Posted ${job.postedDays} day${job.postedDays !== 1 ? 's' : ''} ago</span>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          ${skillsHTML}
        </div>
        <div class="mt-4 flex justify-between items-center">
          <div class="text-gray-700">
            <i class="fas fa-dollar-sign"></i>
            <span>${job.salary}</span>
          </div>
          <div class="space-x-2">
            <button class="text-gray-500 hover:text-indigo-600 save-job-btn">
              <i class="far fa-bookmark"></i>
            </button>
            <a href="#" class="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700">Apply Now</a>
          </div>
        </div>
      </div>
    `;
  });
  
  jobListings.innerHTML = jobsHTML;
  
  // Add event listeners to the newly created save job buttons
  document.querySelectorAll('.save-job-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      
      if (icon.classList.contains('far')) {
        // Save job
        icon.classList.remove('far');
        icon.classList.add('fas');
        showToast('Job saved to your favorites!', 'success');
      } else {
        // Unsave job
        icon.classList.remove('fas');
        icon.classList.add('far');
        showToast('Job removed from your favorites.', 'info');
      }
    });
  });
}

// Profile Management
function initializeProfileManagement() {
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const profileForm = document.getElementById('profile-form');
  const skillsInput = document.getElementById('skills-input');
  const addSkillBtn = document.getElementById('add-skill-btn');
  const skillsContainer = document.getElementById('skills-container');
  
  // Edit profile button
  if (editProfileBtn && profileForm) {
    editProfileBtn.addEventListener('click', function() {
      profileForm.classList.toggle('hidden');
      if (!profileForm.classList.contains('hidden')) {
        this.textContent = 'Cancel';
      } else {
        this.textContent = 'Edit';
      }
    });
  }
  
  // Skills management
  if (addSkillBtn && skillsInput && skillsContainer) {
    addSkillBtn.addEventListener('click', function() {
      const skill = skillsInput.value.trim();
      if (skill) {
        addSkillTag(skill);
        skillsInput.value = '';
        updateProfileCompleteness();
        showToast('Skill added successfully!', 'success');
      }
    });
    
    // Add skill on enter key
    skillsInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSkillBtn.click();
      }
    });
  }
  
  // Initialize existing skills with delete functionality
  document.querySelectorAll('.skill-tag').forEach(skillTag => {
    makeSkillTagDeletable(skillTag);
  });
  
  // Resume upload
  const resumeUpload = document.getElementById('resume-upload');
  const resumeFilename = document.getElementById('resume-filename');
  
  if (resumeUpload && resumeFilename) {
    resumeUpload.addEventListener('change', function() {
      if (this.files.length > 0) {
        resumeFilename.textContent = this.files[0].name;
        updateProfileCompleteness();
        showToast('Resume uploaded successfully!', 'success');
      }
    });
  }
  
  // Video resume upload
  const videoUploadBtn = document.getElementById('video-upload-btn');
  const videoPreview = document.getElementById('video-preview');
  
  if (videoUploadBtn && videoPreview) {
    videoUploadBtn.addEventListener('click', function() {
      // Simulate video upload - in a real app this would be a file upload
      videoUploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Uploading...';
      
      setTimeout(() => {
        videoPreview.innerHTML = `
          <div class="relative">
            <video class="w-full rounded-lg" poster="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80">
              <source src="#" type="video/mp4">
            </video>
            <div class="absolute inset-0 flex items-center justify-center">
              <button class="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                <i class="fas fa-play"></i>
              </button>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <span class="text-sm text-gray-600">Video Introduction</span>
            <button class="text-red-500 text-sm"><i class="fas fa-trash-alt mr-1"></i>Remove</button>
          </div>
        `;
        videoUploadBtn.classList.add('hidden');
        updateProfileCompleteness();
        showToast('Video introduction uploaded!', 'success');
      }, 2000);
    });
  }
}

function addSkillTag(skill) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;
  
  const skillTag = document.createElement('span');
  skillTag.className = 'skill-tag text-xs px-2 py-1 rounded-full flex items-center m-1';
  skillTag.innerHTML = `
    ${skill}
    <button class="ml-1 text-indigo-600 hover:text-indigo-800">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  skillsContainer.appendChild(skillTag);
  makeSkillTagDeletable(skillTag);
}

function makeSkillTagDeletable(skillTag) {
  const deleteBtn = skillTag.querySelector('button');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function() {
      skillTag.remove();
      updateProfileCompleteness();
    });
  }
}

// Profile Completeness
function updateProfileCompleteness() {
  const progress = document.getElementById('profile-progress');
  const progressText = document.getElementById('profile-progress-text');
  const itemsRemainingText = document.getElementById('items-remaining-text');
  
  if (!progress || !progressText || !itemsRemainingText) return;
  
  // Calculate completeness - in a real app this would be more sophisticated
  let completedItems = 0;
  let totalItems = 4;
  
  // Check basic info (always completed in our demo)
  completedItems++;
  
  // Check resume
  const resumeFilename = document.getElementById('resume-filename');
  if (resumeFilename && resumeFilename.textContent !== 'No file chosen') {
    completedItems++;
    document.getElementById('resume-check').classList.remove('fa-times-circle', 'text-red-500');
    document.getElementById('resume-check').classList.add('fa-check-circle', 'text-green-500');
  }
  
  // Check skills
  const skills = document.querySelectorAll('.skill-tag');
  if (skills.length > 0) {
    completedItems++;
    document.getElementById('skills-check').classList.remove('fa-times-circle', 'text-red-500');
    document.getElementById('skills-check').classList.add('fa-check-circle', 'text-green-500');
  }
  
  // Check video introduction
  const videoPreview = document.getElementById('video-preview');
  if (videoPreview && videoPreview.innerHTML !== '') {
    completedItems++;
    document.getElementById('video-check').classList.remove('fa-times-circle', 'text-red-500');
    document.getElementById('video-check').classList.add('fa-check-circle', 'text-green-500');
  }
  
  // Update progress
  const percentage = Math.round((completedItems / totalItems) * 100);
  progress.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% Complete`;
  
  const itemsRemaining = totalItems - completedItems;
  itemsRemainingText.textContent = `${itemsRemaining} item${itemsRemaining !== 1 ? 's' : ''} remaining`;
}

// Notifications System
function initializeNotifications() {
  const notificationBtn = document.getElementById('notification-btn');
  const notificationDropdown = document.getElementById('notification-dropdown');
  
  if (notificationBtn && notificationDropdown) {
    // Toggle dropdown
    notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle('hidden');
      
      // Mark as read when opened
      if (!notificationDropdown.classList.contains('hidden')) {
        const notificationBadge = document.getElementById('notification-badge');
        if (notificationBadge) {
          notificationBadge.classList.add('hidden');
        }
        
        // Mark all as read
        document.querySelectorAll('.notification-item.unread').forEach(item => {
          item.classList.remove('unread', 'bg-indigo-50');
        });
      }
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
      notificationDropdown.classList.add('hidden');
    });
    
    // Prevent dropdown from closing when clicking inside it
    notificationDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Clear all notifications
  const clearNotificationsBtn = document.getElementById('clear-notifications-btn');
  if (clearNotificationsBtn && notificationDropdown) {
    clearNotificationsBtn.addEventListener('click', function() {
      const notificationsList = document.getElementById('notifications-list');
      if (notificationsList) {
        notificationsList.innerHTML = `
          <div class="py-4 text-center text-gray-500">
            No new notifications
          </div>
        `;
      }
      showToast('All notifications cleared', 'success');
    });
  }
}

// Interview Preparation
function initializeInterviewPrep() {
  const prepareBtn = document.getElementById('interview-prepare-btn');
  const interviewPrepModal = document.getElementById('interview-prep-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  if (prepareBtn && interviewPrepModal && closeModalBtn) {
    prepareBtn.addEventListener('click', function() {
      interviewPrepModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
    
    closeModalBtn.addEventListener('click', function() {
      interviewPrepModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    
    // Close modal when clicking outside
    interviewPrepModal.addEventListener('click', function(e) {
      if (e.target === interviewPrepModal) {
        interviewPrepModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
  
  // Practice interview questions
  const practiceQuestionBtn = document.getElementById('practice-question-btn');
  const questionContainer = document.getElementById('practice-question-container');
  
  if (practiceQuestionBtn && questionContainer) {
    practiceQuestionBtn.addEventListener('click', function() {
      // Sample questions - in a real app these would come from an API
      const questions = [
        "Can you tell me about a challenging project you worked on and how you overcame obstacles?",
        "Describe a situation where you had to learn a new technology quickly. How did you approach it?",
        "How do you handle feedback and criticism about your work?",
        "Explain a complex technical concept in simple terms.",
        "How do you stay updated with the latest technologies in your field?",
        "Describe your ideal work environment and team structure.",
        "What's your approach to debugging a complex problem?"
      ];
      
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      
      questionContainer.innerHTML = `
        <div class="p-4 border border-indigo-200 rounded-lg bg-indigo-50 mt-4">
          <p class="font-medium">${randomQuestion}</p>
          <div class="mt-3">
            <textarea class="w-full p-2 border border-gray-300 rounded-md" 
              rows="4" 
              placeholder="Type your answer here..."></textarea>
          </div>
          <div class="mt-2 flex justify-between">
            <button class="text-indigo-600 hover:text-indigo-800">
              <i class="fas fa-microphone mr-1"></i>Record Answer
            </button>
            <button class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
              Submit for AI Feedback
            </button>
          </div>
        </div>
      `;
    });
  }
}

// Chat System
function initializeChat() {
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatPanel = document.getElementById('chat-panel');
  const closeChatBtn = document.getElementById('close-chat-btn');
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');
  
  if (chatToggleBtn && chatPanel) {
    chatToggleBtn.addEventListener('click', function() {
      chatPanel.classList.remove('hidden');
    });
  }
  
  if (closeChatBtn && chatPanel) {
    closeChatBtn.addEventListener('click', function() {
      chatPanel.classList.add('hidden');
    });
  }
  
  if (chatForm && chatMessages) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const messageInput = document.getElementById('chat-message-input');
      const message = messageInput.value.trim();
      
      if (message) {
        // Add user message
        addChatMessage(message, 'user');
        messageInput.value = '';
        
        // Simulate typing indicator
        chatMessages.innerHTML += `
          <div id="typing-indicator" class="flex items-start mb-4">
            <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Recruiter" class="w-8 h-8 rounded-full mr-3">
            <div class="bg-gray-100 p-2 rounded-lg">
              <div class="typing-animation flex space-x-1">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate reply after delay
        setTimeout(() => {
          const typingIndicator = document.getElementById('typing-indicator');
          if (typingIndicator) {
            typingIndicator.remove();
          }
          
          // Sample responses
          const responses = [
            "Thanks for reaching out! I've reviewed your profile and I'm impressed with your skills.",
            "That's a great question. The interview process consists of a technical assessment followed by two rounds of interviews.",
            "Yes, this position allows for remote work with occasional visits to the office.",
            "The team is currently 8 people and is looking to expand to 12 by the end of the quarter.",
            "Your application is currently under review. We should have feedback within the next few days."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addChatMessage(randomResponse, 'recruiter');
        }, 1500);
      }
    });
  }
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  let html = '';
  
  if (sender === 'user') {
    html = `
      <div class="flex items-start justify-end mb-4">
        <div class="bg-indigo-600 text-white p-3 rounded-lg max-w-xs">
          <p>${message}</p>
          <span class="text-xs text-indigo-200 block text-right mt-1">
            ${getCurrentTime()}
          </span>
        </div>
        <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="You" class="w-8 h-8 rounded-full ml-3">
      </div>
    `;
  } else {
    html = `
      <div class="flex items-start mb-4">
        <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Recruiter" class="w-8 h-8 rounded-full mr-3">
        <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
          <p>${message}</p>
          <span class="text-xs text-gray-500 block mt-1">
            ${getCurrentTime()}
          </span>
        </div>
      </div>
    `;
  }
  
  chatMessages.innerHTML += html;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Toast Notifications
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast-notification');
  existingToasts.forEach(toast => {
    toast.remove();
  });
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all transform translate-y-0 opacity-100';
  
  // Style based on type
  let icon = '';
  switch (type) {
    case 'success':
      toast.classList.add('bg-green-600', 'text-white');
      icon = '<i class="fas fa-check-circle mr-2"></i>';
      break;
    case 'error':
      toast.classList.add('bg-red-600', 'text-white');
      icon = '<i class="fas fa-exclamation-circle mr-2"></i>';
      break;
    case 'warning':
      toast.classList.add('bg-yellow-500', 'text-white');
      icon = '<i class="fas fa-exclamation-triangle mr-2"></i>';
      break;
    default:
      toast.classList.add('bg-indigo-600', 'text-white');
      icon = '<i class="fas fa-info-circle mr-2"></i>';
  }
  
  toast.innerHTML = `
    <div class="flex items-center">
      ${icon}
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Initialize all functions when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeJobSearch();
  initializeProfileManagement();
  updateProfileCompleteness();
  initializeNotifications();
  initializeInterviewPrep();
  initializeChat();
  
  // Add some more interactivity to AI Career Assistant
  const aiAssistantOptions = document.querySelectorAll('.ai-assistant-option');
  aiAssistantOptions.forEach(option => {
    option.addEventListener('click', function() {
      showToast('AI Assistant feature launched!', 'success');
    });
  });
  
  // Simulate a real-time notification after some time
  setTimeout(() => {
    const notificationBadge = document.getElementById('notification-badge');
    if (notificationBadge) {
      notificationBadge.classList.remove('hidden');
      showToast('You have a new notification!', 'info');
    }
  }, 5000);
});
