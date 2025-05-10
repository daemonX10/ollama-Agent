// Recruiter Portal Functions

// Dashboard Analytics
function initializeDashboardCharts() {
  const applicationChart = document.getElementById('application-chart');
  const sourceChart = document.getElementById('source-chart');
  
  if (applicationChart) {
    // Simple chart rendering with inline styles
    // In a real application, you would use a chart library like Chart.js
    applicationChart.innerHTML = `
      <div class="flex items-end h-32 space-x-2">
        <div class="relative h-full flex flex-col justify-end items-center flex-1">
          <div class="bg-indigo-500 w-full rounded-t-sm" style="height: 40%"></div>
          <span class="text-xs mt-1">Jan</span>
        </div>
        <div class="relative h-full flex flex-col justify-end items-center flex-1">
          <div class="bg-indigo-500 w-full rounded-t-sm" style="height: 60%"></div>
          <span class="text-xs mt-1">Feb</span>
        </div>
        <div class="relative h-full flex flex-col justify-end items-center flex-1">
          <div class="bg-indigo-500 w-full rounded-t-sm" style="height: 45%"></div>
          <span class="text-xs mt-1">Mar</span>
        </div>
        <div class="relative h-full flex flex-col justify-end items-center flex-1">
          <div class="bg-indigo-500 w-full rounded-t-sm" style="height: 70%"></div>
          <span class="text-xs mt-1">Apr</span>
        </div>
        <div class="relative h-full flex flex-col justify-end items-center flex-1">
          <div class="bg-indigo-500 w-full rounded-t-sm" style="height: 85%"></div>
          <span class="text-xs mt-1">May</span>
        </div>
      </div>
    `;
  }
  
  if (sourceChart) {
    sourceChart.innerHTML = `
      <div class="flex h-32">
        <div class="flex-1 flex items-center justify-center flex-col">
          <div class="w-full h-full flex items-center justify-center">
            <div class="w-24 h-24 rounded-full border-4 border-indigo-500 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-lg font-semibold">62%</div>
                  <div class="text-xs text-gray-500">Job Boards</div>
                </div>
              </div>
              <div class="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full text-white flex items-center justify-center">
                <i class="fas fa-briefcase text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 space-y-2 py-2">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></div>
            <span class="text-xs">Job Boards - 62%</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
            <span class="text-xs">Referrals - 18%</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-500 rounded-sm mr-2"></div>
            <span class="text-xs">Social Media - 12%</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
            <span class="text-xs">Other - 8%</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Job Management
function initializeJobManagement() {
  const newJobBtn = document.getElementById('new-job-btn');
  const jobModal = document.getElementById('job-modal');
  const closeJobModalBtn = document.getElementById('close-job-modal-btn');
  const jobForm = document.getElementById('job-form');
  
  // Add/remove job requirement fields
  const addRequirementBtn = document.getElementById('add-requirement-btn');
  const requirementsContainer = document.getElementById('requirements-container');
  
  if (addRequirementBtn && requirementsContainer) {
    addRequirementBtn.addEventListener('click', function() {
      const newRequirement = document.createElement('div');
      newRequirement.className = 'requirement-item flex space-x-2';
      newRequirement.innerHTML = `
        <input type="text" name="requirements[]" required
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600">
        <button type="button" class="remove-requirement px-2 py-1 text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
        </button>
      `;
      requirementsContainer.appendChild(newRequirement);
      
      // Add remove functionality to the new button
      const removeBtn = newRequirement.querySelector('.remove-requirement');
      removeBtn.addEventListener('click', function() {
        requirementsContainer.removeChild(newRequirement);
      });
    });
    
    // Add remove functionality to existing buttons
    document.querySelectorAll('.remove-requirement').forEach(button => {
      button.addEventListener('click', function() {
        button.closest('.requirement-item').remove();
      });
    });
  }
  
  // Add/remove job benefit fields
  const addBenefitBtn = document.getElementById('add-benefit-btn');
  const benefitsContainer = document.getElementById('benefits-container');
  
  if (addBenefitBtn && benefitsContainer) {
    addBenefitBtn.addEventListener('click', function() {
      const newBenefit = document.createElement('div');
      newBenefit.className = 'benefit-item flex space-x-2';
      newBenefit.innerHTML = `
        <input type="text" name="benefits[]" required
            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600">
        <button type="button" class="remove-benefit px-2 py-1 text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
        </button>
      `;
      benefitsContainer.appendChild(newBenefit);
      
      // Add remove functionality to the new button
      const removeBtn = newBenefit.querySelector('.remove-benefit');
      removeBtn.addEventListener('click', function() {
        benefitsContainer.removeChild(newBenefit);
      });
    });
    
    // Add remove functionality to existing buttons
    document.querySelectorAll('.remove-benefit').forEach(button => {
      button.addEventListener('click', function() {
        button.closest('.benefit-item').remove();
      });
    });
  }
  
  // Open job creation modal
  if (newJobBtn && jobModal) {
    newJobBtn.addEventListener('click', function() {
      jobModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }
  
  // Close job creation modal
  if (closeJobModalBtn && jobModal) {
    closeJobModalBtn.addEventListener('click', function() {
      jobModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    
    // Close when clicking outside
    jobModal.addEventListener('click', function(e) {
      if (e.target === jobModal) {
        jobModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
  
  // Job form submission
  if (jobForm) {
    jobForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = document.getElementById('job-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating...';
      }
      
      // Simulate form submission
      setTimeout(() => {
        if (jobModal) {
          jobModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
        
        showToast('Job posting created successfully!', 'success');
        
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Create Job Posting';
        }
        
        // Reset form
        jobForm.reset();
        
        // Refresh job list
        updateJobsList();
      }, 1500);
    });
  }
  
  // Job status toggle
  document.querySelectorAll('.job-status-toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
      const jobId = this.getAttribute('data-job-id');
      const status = this.checked ? 'active' : 'paused';
      const statusBadge = document.querySelector(`.job-status-badge[data-job-id="${jobId}"]`);
      
      if (statusBadge) {
        // Update status badge
        statusBadge.className = `status-badge ${status === 'active' ? 'status-active' : 'status-paused'}`;
        statusBadge.textContent = status === 'active' ? 'Active' : 'Paused';
        
        showToast(`Job status updated to ${status}`, 'success');
      }
    });
  });
}

function updateJobsList() {
  const jobsList = document.getElementById('jobs-list');
  if (!jobsList) return;
  
  // Add a new job to the top of the list
  const newJob = document.createElement('tr');
  newJob.className = 'border-b hover:bg-gray-50';
  newJob.innerHTML = `
    <td class="py-3 px-4">
      <div class="font-medium">Data Scientist</div>
      <div class="text-sm text-gray-500">Data</div>
    </td>
    <td class="py-3 px-4 text-gray-600">0</td>
    <td class="py-3 px-4">
      <span class="status-badge status-active">Active</span>
    </td>
    <td class="py-3 px-4 text-gray-600">Just now</td>
    <td class="py-3 px-4">
      <div class="flex space-x-2">
        <button class="text-gray-500 hover:text-indigo-600">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-gray-500 hover:text-indigo-600">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </td>
  `;
  
  // Get the first row and insert before it
  const firstRow = jobsList.querySelector('tr');
  if (firstRow) {
    jobsList.insertBefore(newJob, firstRow);
  } else {
    jobsList.appendChild(newJob);
  }
  
  // Update job count
  const activeJobsCount = document.getElementById('active-jobs-count');
  if (activeJobsCount) {
    const currentCount = parseInt(activeJobsCount.textContent, 10);
    activeJobsCount.textContent = currentCount + 1;
  }
}

// Candidate Management
function initializeCandidateManagement() {
  const filterForm = document.getElementById('candidate-filter-form');
  const candidateResults = document.getElementById('candidate-results');
  
  if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (candidateResults) {
        // Show loading
        candidateResults.innerHTML = '<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>';
        
        // Simulate API call
        setTimeout(() => {
          displayFilteredCandidates();
          showToast('Candidates filtered successfully', 'success');
        }, 1000);
      }
    });
  }
  
  // Candidate rating functionality
  document.querySelectorAll('.candidate-rating').forEach(rating => {
    rating.addEventListener('click', function(e) {
      if (e.target.classList.contains('fa-star')) {
        // Get all stars
        const stars = this.querySelectorAll('.fa-star');
        let value = 0;
        
        // Reset all stars
        stars.forEach(star => {
          star.classList.remove('fas', 'text-yellow-400');
          star.classList.add('far', 'text-gray-300');
        });
        
        // Set rating
        const clickedIndex = Array.from(stars).indexOf(e.target);
        for (let i = 0; i <= clickedIndex; i++) {
          stars[i].classList.remove('far', 'text-gray-300');
          stars[i].classList.add('fas', 'text-yellow-400');
          value = i + 1;
        }
        
        showToast(`Candidate rated ${value} stars`, 'success');
      }
    });
  });
  
  // Initialize candidate chat
  initializeChat();
}

function displayFilteredCandidates() {
  const candidateResults = document.getElementById('candidate-results');
  if (!candidateResults) return;
  
  // Sample candidates - in a real app this would be filtered
  candidateResults.innerHTML = `
    <!-- Candidate 1 -->
    <div class="border border-gray-200 rounded-lg p-4 candidate-card transition-all duration-200">
      <div class="flex justify-between items-start">
        <div class="flex items-start space-x-3">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Candidate" class="w-12 h-12 rounded-full object-cover">
          <div>
            <h3 class="font-semibold">Michael Chen</h3>
            <div class="text-gray-600 text-sm">Senior Software Engineer</div>
            <div class="text-gray-500 text-sm">5 years experience • San Francisco, CA</div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">96% Match</span>
          <div class="candidate-rating flex mt-2">
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="far fa-star text-gray-300 cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="skill-tag text-xs px-2 py-1 rounded-full">JavaScript</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">React</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Node.js</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">AWS</span>
      </div>
      <div class="mt-3 border-t border-gray-100 pt-3 flex justify-between items-center">
        <div class="text-xs text-gray-500">
          <i class="far fa-clock mr-1"></i>Applied 3 days ago
        </div>
        <div class="space-x-2">
          <button class="text-gray-500 hover:text-indigo-600" title="View Resume">
            <i class="fas fa-file-alt"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Send Message">
            <i class="fas fa-envelope"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Schedule Interview">
            <i class="fas fa-calendar-alt"></i>
          </button>
          <a href="#" class="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700">View Profile</a>
        </div>
      </div>
    </div>
    
    <!-- Candidate 2 -->
    <div class="border border-gray-200 rounded-lg p-4 candidate-card transition-all duration-200">
      <div class="flex justify-between items-start">
        <div class="flex items-start space-x-3">
          <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Candidate" class="w-12 h-12 rounded-full object-cover">
          <div>
            <h3 class="font-semibold">Emily Johnson</h3>
            <div class="text-gray-600 text-sm">Product Designer</div>
            <div class="text-gray-500 text-sm">4 years experience • Remote</div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">94% Match</span>
          <div class="candidate-rating flex mt-2">
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="far fa-star text-gray-300 cursor-pointer"></i>
            <i class="far fa-star text-gray-300 cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="skill-tag text-xs px-2 py-1 rounded-full">UI/UX</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Figma</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">User Research</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Prototyping</span>
      </div>
      <div class="mt-3 border-t border-gray-100 pt-3 flex justify-between items-center">
        <div class="text-xs text-gray-500">
          <i class="far fa-clock mr-1"></i>Applied 1 week ago
        </div>
        <div class="space-x-2">
          <button class="text-gray-500 hover:text-indigo-600" title="View Resume">
            <i class="fas fa-file-alt"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Send Message">
            <i class="fas fa-envelope"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Schedule Interview">
            <i class="fas fa-calendar-alt"></i>
          </button>
          <a href="#" class="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700">View Profile</a>
        </div>
      </div>
    </div>
    
    <!-- Candidate 3 -->
    <div class="border border-gray-200 rounded-lg p-4 candidate-card transition-all duration-200">
      <div class="flex justify-between items-start">
        <div class="flex items-start space-x-3">
          <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Candidate" class="w-12 h-12 rounded-full object-cover">
          <div>
            <h3 class="font-semibold">Robert Williams</h3>
            <div class="text-gray-600 text-sm">Marketing Manager</div>
            <div class="text-gray-500 text-sm">7 years experience • New York, NY</div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">85% Match</span>
          <div class="candidate-rating flex mt-2">
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
            <i class="fas fa-star text-yellow-400 cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Marketing Strategy</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">SEO</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Social Media</span>
        <span class="skill-tag text-xs px-2 py-1 rounded-full">Analytics</span>
      </div>
      <div class="mt-3 border-t border-gray-100 pt-3 flex justify-between items-center">
        <div class="text-xs text-gray-500">
          <i class="far fa-clock mr-1"></i>Applied 2 days ago
        </div>
        <div class="space-x-2">
          <button class="text-gray-500 hover:text-indigo-600" title="View Resume">
            <i class="fas fa-file-alt"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Send Message">
            <i class="fas fa-envelope"></i>
          </button>
          <button class="text-gray-500 hover:text-indigo-600" title="Schedule Interview">
            <i class="fas fa-calendar-alt"></i>
          </button>
          <a href="#" class="bg-indigo-600 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-700">View Profile</a>
        </div>
      </div>
    </div>
  `;
}

// Interview Scheduling
function initializeInterviewScheduling() {
  const scheduleBtn = document.getElementById('schedule-interview-btn');
  const scheduleModal = document.getElementById('schedule-modal');
  const closeScheduleModalBtn = document.getElementById('close-schedule-modal-btn');
  const scheduleForm = document.getElementById('schedule-form');
  
  if (scheduleBtn && scheduleModal) {
    scheduleBtn.addEventListener('click', function() {
      scheduleModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }
  
  if (closeScheduleModalBtn && scheduleModal) {
    closeScheduleModalBtn.addEventListener('click', function() {
      scheduleModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    
    // Close when clicking outside
    scheduleModal.addEventListener('click', function(e) {
      if (e.target === scheduleModal) {
        scheduleModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
  
  if (scheduleForm) {
    scheduleForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = document.getElementById('schedule-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scheduling...';
      }
      
      // Simulate form submission
      setTimeout(() => {
        if (scheduleModal) {
          scheduleModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
        
        showToast('Interview scheduled successfully!', 'success');
        
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Schedule Interview';
        }
        
        // Reset form
        scheduleForm.reset();
        
        // Update interview count
        const interviewCount = document.getElementById('interviews-count');
        if (interviewCount) {
          const currentCount = parseInt(interviewCount.textContent, 10);
          interviewCount.textContent = currentCount + 1;
        }
      }, 1500);
    });
  }
}

// AI Recruiter Assistant
function initializeAIAssistant() {
  const aiAssistantBtn = document.getElementById('ai-assistant-btn');
  const aiModal = document.getElementById('ai-assistant-modal');
  const closeAiModalBtn = document.getElementById('close-ai-modal-btn');
  const aiPromptForm = document.getElementById('ai-prompt-form');
  const aiResponseContainer = document.getElementById('ai-response-container');
  
  if (aiAssistantBtn && aiModal) {
    aiAssistantBtn.addEventListener('click', function() {
      aiModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }
  
  if (closeAiModalBtn && aiModal) {
    closeAiModalBtn.addEventListener('click', function() {
      aiModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    
    // Close when clicking outside
    aiModal.addEventListener('click', function(e) {
      if (e.target === aiModal) {
        aiModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });  }
  
  if (aiPromptForm && aiResponseContainer) {
    aiPromptForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const promptInput = document.getElementById('ai-prompt-input');
      const prompt = promptInput.value.trim();
      
      if (prompt) {
        // Show typing indicator
        aiResponseContainer.innerHTML = `
          <div class="bg-gray-100 p-4 rounded-lg mb-4 flex items-start">
            <div class="flex-shrink-0 mr-3">
              <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <i class="fas fa-robot"></i>
              </div>
            </div>
            <div class="typing-animation flex space-x-1">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        `;
        
        // Simulate AI response
        setTimeout(() => {
          generateAIResponse(prompt);
          promptInput.value = '';
        }, 1500);
      }
    });
  }
  
  // Quick prompts
  document.querySelectorAll('.ai-quick-prompt').forEach(button => {
    button.addEventListener('click', function() {
      const prompt = this.getAttribute('data-prompt');
      const promptInput = document.getElementById('ai-prompt-input');
      
      if (promptInput && prompt) {
        promptInput.value = prompt;
        
        // Trigger form submission
        const aiPromptForm = document.getElementById('ai-prompt-form');
        if (aiPromptForm) {
          const submitEvent = new Event('submit', {
            'bubbles': true,
            'cancelable': true
          });
          aiPromptForm.dispatchEvent(submitEvent);
        }
      }
    });
  });
}

// AI Job Screening System Integration
function initializeAIJobScreening() {
  const screeningBtn = document.getElementById('ai-job-screening-btn');
  const screeningModal = document.getElementById('ai-job-screening-modal');
  const closeScreeningBtn = document.getElementById('close-job-screening-modal-btn');
  const startScreeningBtn = document.getElementById('start-screening-btn');
  const saveResultsBtn = document.getElementById('save-results-btn');
  const screeningStatus = document.getElementById('screening-status');
  const screeningLoading = document.getElementById('screening-loading');
  const screeningResults = document.getElementById('screening-results');
  const jobSelect = document.getElementById('screening-job-select');
  const candidatePool = document.getElementById('screening-candidate-pool');
  
  // Handle opening the modal
  if (screeningBtn && screeningModal) {
    screeningBtn.addEventListener('click', function() {
      screeningModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }
  
  // Handle closing the modal
  if (closeScreeningBtn && screeningModal) {
    closeScreeningBtn.addEventListener('click', function() {
      screeningModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
    
    // Close when clicking outside
    screeningModal.addEventListener('click', function(e) {
      if (e.target === screeningModal) {
        screeningModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
  
  // Handle starting the screening process
  if (startScreeningBtn) {
    startScreeningBtn.addEventListener('click', function() {
      const selectedJobId = jobSelect.value;
      const selectedPool = candidatePool.value;
      
      if (!selectedJobId) {
        showToast('Please select a job posting first', 'error');
        return;
      }
      
      // Update UI to show processing
      startScreeningBtn.disabled = true;
      saveResultsBtn.disabled = true;
      screeningStatus.textContent = 'Processing...';
      screeningLoading.classList.remove('hidden');
      screeningResults.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full">
          <div class="loader mb-4 w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p class="text-indigo-600 font-medium">Analyzing job requirements and candidates...</p>
          <p class="text-sm text-gray-500 mt-2">This process will take a few moments</p>
        </div>
      `;
      
      // Get sample data for the demo
      const jobDescription = getSampleJobDescription(selectedJobId);
      const candidates = getSampleCandidates(selectedJobId, selectedPool);
      
      // Initialize the agent orchestrator from the AI job screening system
      const orchestrator = new AgentOrchestrator();
      
      // Start the screening process
      orchestrator.startScreening(selectedJobId, jobDescription, candidates)
        .then(result => {
          if (result.success) {
            // Update UI with results
            displayScreeningResults(result.shortlistedCandidates);
            
            // Show match statistics
            if (result.matchStats) {
              const matchStats = document.createElement('div');
              matchStats.className = 'bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200';
              matchStats.innerHTML = `
                <h4 class="font-medium text-sm mb-2">Screening Summary</h4>
                <div class="grid grid-cols-4 gap-3 text-center">
                  <div class="bg-white p-2 rounded border border-gray-200">
                    <div class="text-2xl font-bold text-gray-700">${result.matchStats.totalCandidates}</div>
                    <div class="text-xs text-gray-500">Total Candidates</div>
                  </div>
                  <div class="bg-white p-2 rounded border border-gray-200">
                    <div class="text-2xl font-bold text-green-600">${result.matchStats.highMatches}</div>
                    <div class="text-xs text-gray-500">High Matches</div>
                  </div>
                  <div class="bg-white p-2 rounded border border-gray-200">
                    <div class="text-2xl font-bold text-blue-600">${result.matchStats.mediumMatches}</div>
                    <div class="text-xs text-gray-500">Medium Matches</div>
                  </div>
                  <div class="bg-white p-2 rounded border border-gray-200">
                    <div class="text-2xl font-bold text-yellow-600">${result.matchStats.lowMatches}</div>
                    <div class="text-xs text-gray-500">Low Matches</div>
                  </div>
                </div>
              `;
              
              // Insert the stats before the candidates list
              const summaryView = document.getElementById('summary-view');
              if (summaryView) {
                summaryView.insertBefore(matchStats, summaryView.firstChild);
              }
            }
            
            // Enable save button
            saveResultsBtn.disabled = false;
            screeningStatus.textContent = 'Screening completed';
            screeningLoading.classList.add('hidden');
            
            // Show success message
            showToast('AI screening completed successfully', 'success');
          } else {
            // Show error
            screeningStatus.textContent = 'Screening failed';
            screeningResults.innerHTML = `
              <div class="flex flex-col items-center justify-center h-full text-red-500">
                <i class="fas fa-exclamation-triangle text-5xl mb-4"></i>
                <p class="text-lg">Error: ${result.message}</p>
                <p class="text-sm text-gray-500 mt-2">Please try again</p>
              </div>
            `;
            
            showToast('Error during screening: ' + result.message, 'error');
          }
        })
        .catch(error => {
          console.error('Screening error:', error);
          screeningStatus.textContent = 'Screening failed';
          screeningLoading.classList.add('hidden');
          screeningResults.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-red-500">
              <i class="fas fa-exclamation-triangle text-5xl mb-4"></i>
              <p class="text-lg">Error: ${error.message || 'Unknown error occurred'}</p>
              <p class="text-sm text-gray-500 mt-2">Please try again</p>
            </div>
          `;
          
          showToast('Error during screening process', 'error');
        })
        .finally(() => {
          startScreeningBtn.disabled = false;
          screeningLoading.classList.add('hidden');
        });
    });
  }
  
  // Handle saving the results
  if (saveResultsBtn) {
    saveResultsBtn.addEventListener('click', function() {
      showToast('Screening results saved successfully', 'success');
      saveResultsBtn.disabled = true;
      
      // In a real app, this would save the results to the database
      setTimeout(() => {
        screeningModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 1000);
    });
  }
}

// Helper function to display screening results
function displayScreeningResults(candidates) {
  const screeningResults = document.getElementById('screening-results');
  if (!screeningResults || !candidates || candidates.length === 0) return;
  
  // Create tabs for different views
  let html = `
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h3 class="font-medium text-lg">Shortlisted Candidates (${candidates.length})</h3>
        <p class="text-sm text-gray-500">Candidates are ranked by match score</p>
      </div>
      <div class="flex space-x-2">
        <button id="view-summary-btn" class="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 active">Summary View</button>
        <button id="view-detailed-btn" class="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">Detailed View</button>
      </div>
    </div>
    
    <div id="summary-view" class="space-y-4">
  `;
  
  // Generate HTML for each candidate - summary view
  candidates.forEach(candidate => {
    let matchBadgeClass = 'bg-gray-100 text-gray-800';
    if (candidate.matchScore >= 90) {
      matchBadgeClass = 'bg-green-100 text-green-800';
    } else if (candidate.matchScore >= 75) {
      matchBadgeClass = 'bg-blue-100 text-blue-800';
    } else if (candidate.matchScore >= 60) {
      matchBadgeClass = 'bg-yellow-100 text-yellow-800';
    }
    
    html += `
      <div class="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition duration-150">
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div class="font-medium text-lg">#${candidate.shortlistRank}</div>
            <div>
              <h3 class="font-semibold">${candidate.candidateName}</h3>
              <div class="text-sm text-gray-600">${candidate.candidateId}</div>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span class="${matchBadgeClass} text-xs px-2 py-1 rounded-full">${candidate.matchScore}% Match</span>
            <span class="text-xs text-gray-500 mt-1">Priority: ${candidate.priority}</span>
          </div>
        </div>
        
        <div class="mt-3 grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Strengths</h4>
            <ul class="text-sm space-y-1">
              ${candidate.strengths.map(strength => `<li><i class="fas fa-check text-green-500 mr-1"></i>${strength}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Gaps</h4>
            <ul class="text-sm space-y-1">
              ${candidate.gaps.map(gap => `<li><i class="fas fa-times text-red-500 mr-1"></i>${gap}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div class="text-sm font-medium">${candidate.recommendation}</div>
          <div class="space-x-2">
            <button class="text-indigo-600 hover:text-indigo-800 text-sm view-profile-btn" data-candidate-id="${candidate.candidateId}">View Profile</button>
            <button class="text-indigo-600 hover:text-indigo-800 text-sm schedule-interview-btn" data-candidate-id="${candidate.candidateId}">Schedule Interview</button>
            <button class="text-gray-400 hover:text-indigo-600 text-sm view-details-btn" data-candidate-id="${candidate.candidateId}">
              <i class="fas fa-chart-bar mr-1"></i>Details
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div>'; // End of summary view
  
  // Create detailed view (hidden initially)
  html += `
    <div id="detailed-view" class="space-y-4 hidden">
  `;
  
  // Detailed view with match analysis charts
  candidates.forEach(candidate => {
    let matchBadgeClass = 'bg-gray-100 text-gray-800';
    if (candidate.matchScore >= 90) {
      matchBadgeClass = 'bg-green-100 text-green-800';
    } else if (candidate.matchScore >= 75) {
      matchBadgeClass = 'bg-blue-100 text-blue-800';
    } else if (candidate.matchScore >= 60) {
      matchBadgeClass = 'bg-yellow-100 text-yellow-800';
    }
    
    // Get match details if available
    const skillScore = candidate.skillMatchDetails ? candidate.skillMatchDetails.overallScore : 0;
    const expScore = candidate.experienceMatchDetails ? candidate.experienceMatchDetails.overallScore : 0;
    const eduScore = candidate.educationMatchDetails ? candidate.educationMatchDetails.overallScore : 0;
    
    html += `
      <div class="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition duration-150">
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div class="font-medium text-lg">#${candidate.shortlistRank}</div>
            <div>
              <h3 class="font-semibold">${candidate.candidateName}</h3>
              <div class="text-sm text-gray-600">${candidate.candidateId}</div>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span class="${matchBadgeClass} text-xs px-2 py-1 rounded-full">${candidate.matchScore}% Match</span>
            <span class="text-xs text-gray-500 mt-1">Priority: ${candidate.priority}</span>
          </div>
        </div>
        
        <!-- Match Analysis Charts -->
        <div class="mt-4">
          <h4 class="text-sm font-semibold mb-3">Match Analysis</h4>
          <div class="grid grid-cols-3 gap-4">
            <!-- Skills Match -->
            <div class="border border-gray-100 rounded p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-medium">Skills Match</span>
                <span class="text-xs font-bold">${skillScore}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: ${skillScore}%"></div>
              </div>
            </div>
            
            <!-- Experience Match -->
            <div class="border border-gray-100 rounded p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-medium">Experience Match</span>
                <span class="text-xs font-bold">${expScore}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: ${expScore}%"></div>
              </div>
            </div>
            
            <!-- Education Match -->
            <div class="border border-gray-100 rounded p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-medium">Education Match</span>
                <span class="text-xs font-bold">${eduScore}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full" style="width: ${eduScore}%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Strengths</h4>
            <ul class="text-sm space-y-1">
              ${candidate.strengths.map(strength => `<li><i class="fas fa-check text-green-500 mr-1"></i>${strength}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Gaps</h4>
            <ul class="text-sm space-y-1">
              ${candidate.gaps.map(gap => `<li><i class="fas fa-times text-red-500 mr-1"></i>${gap}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <!-- Skill Match Details -->
        <div class="mt-4">
          <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Matched Skills</h4>
          <div class="flex flex-wrap gap-2">
            ${candidate.skillMatchDetails && candidate.skillMatchDetails.technicalMatches ? 
              candidate.skillMatchDetails.technicalMatches.map(match => 
                `<span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">${match.required}</span>`
              ).join('') : 'No detailed skill match data available'}
          </div>
        </div>
        
        <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div class="text-sm font-medium">${candidate.recommendation}</div>
          <div class="space-x-2">
            <button class="text-indigo-600 hover:text-indigo-800 text-sm view-profile-btn" data-candidate-id="${candidate.candidateId}">View Full Profile</button>
            <button class="text-indigo-600 hover:text-indigo-800 text-sm schedule-interview-btn" data-candidate-id="${candidate.candidateId}">Schedule Interview</button>
            <button class="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 email-candidate-btn" data-candidate-id="${candidate.candidateId}">
              <i class="fas fa-envelope mr-1"></i>Email Candidate
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div>'; // End of detailed view
  
  screeningResults.innerHTML = html;
  
  // Add event listeners for view toggling
  const summaryViewBtn = document.getElementById('view-summary-btn');
  const detailedViewBtn = document.getElementById('view-detailed-btn');
  const summaryView = document.getElementById('summary-view');
  const detailedView = document.getElementById('detailed-view');
  
  if (summaryViewBtn && detailedViewBtn && summaryView && detailedView) {
    summaryViewBtn.addEventListener('click', function() {
      summaryView.classList.remove('hidden');
      detailedView.classList.add('hidden');
      summaryViewBtn.classList.add('bg-indigo-600', 'text-white');
      summaryViewBtn.classList.remove('border', 'border-indigo-600', 'text-indigo-600');
      detailedViewBtn.classList.remove('bg-indigo-600', 'text-white');
      detailedViewBtn.classList.add('border', 'border-indigo-600', 'text-indigo-600');
    });
    
    detailedViewBtn.addEventListener('click', function() {
      summaryView.classList.add('hidden');
      detailedView.classList.remove('hidden');
      detailedViewBtn.classList.add('bg-indigo-600', 'text-white');
      detailedViewBtn.classList.remove('border', 'border-indigo-600', 'text-indigo-600');
      summaryViewBtn.classList.remove('bg-indigo-600', 'text-white');
      summaryViewBtn.classList.add('border', 'border-indigo-600', 'text-indigo-600');
    });
  }
  
  // Add event listeners for detail view buttons
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      summaryView.classList.add('hidden');
      detailedView.classList.remove('hidden');
      detailedViewBtn.classList.add('bg-indigo-600', 'text-white');
      detailedViewBtn.classList.remove('border', 'border-indigo-600', 'text-indigo-600');
      summaryViewBtn.classList.remove('bg-indigo-600', 'text-white');
      summaryViewBtn.classList.add('border', 'border-indigo-600', 'text-indigo-600');
      
      // Scroll to the candidate's detailed view
      const candidateId = this.getAttribute('data-candidate-id');
      const candidateElement = detailedView.querySelector(`[data-candidate-id="${candidateId}"]`).closest('.border');
      if (candidateElement) {
        candidateElement.scrollIntoView({ behavior: 'smooth' });
        // Highlight the element briefly
        candidateElement.classList.add('border-indigo-500', 'bg-indigo-50');
        setTimeout(() => {
          candidateElement.classList.remove('border-indigo-500', 'bg-indigo-50');
        }, 1500);
      }
    });
  });
  
  // Add event listeners for other buttons
  const viewProfileButtons = document.querySelectorAll('.view-profile-btn');
  const scheduleInterviewButtons = document.querySelectorAll('.schedule-interview-btn');
  const emailCandidateButtons = document.querySelectorAll('.email-candidate-btn');
  
  viewProfileButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const candidateId = this.getAttribute('data-candidate-id');
      showToast(`Viewing profile for candidate ${candidateId}`, 'info');
      // In a real application, this would open a candidate profile view
    });
  });
  
  scheduleInterviewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const candidateId = this.getAttribute('data-candidate-id');
      showToast(`Opening scheduler for candidate ${candidateId}`, 'info');
      // In a real application, this would open an interview scheduling interface
    });
  });
  
  if (emailCandidateButtons) {
    emailCandidateButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const candidateId = this.getAttribute('data-candidate-id');
        const candidate = candidates.find(c => c.candidateId === candidateId);
        if (candidate) {
          showEmailDialog(candidate);
        }
      });
    });
  }
}

// Display email composition dialog
function showEmailDialog(candidate) {
  // Check if dialog already exists
  let emailDialog = document.getElementById('email-candidate-dialog');
  if (emailDialog) {
    document.body.removeChild(emailDialog);
  }
  
  // Create the dialog
  emailDialog = document.createElement('div');
  emailDialog.id = 'email-candidate-dialog';
  emailDialog.className = 'fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center';
  
  // Get email template from the agent orchestrator
  const orchestrator = new AgentOrchestrator();
  const emailTemplate = orchestrator.agents.communication.generateInterviewRequestTemplate();
  const emailPreview = orchestrator.agents.communication.generateEmailPreview(emailTemplate, candidate);
  
  // Create dialog content
  emailDialog.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden flex flex-col">
      <div class="flex items-center justify-between bg-indigo-600 p-4 text-white">
        <h3 class="text-lg font-semibold">Email Candidate: ${candidate.candidateName}</h3>
        <button id="close-email-dialog" class="text-white hover:text-indigo-200">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-4 flex-1 overflow-y-auto">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Template</label>
          <select id="email-template-select" class="w-full p-2 border border-gray-300 rounded-lg">
            <option value="interview">Interview Request</option>
            <option value="followup">Follow-up</option>
            <option value="assessment">Assessment Request</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" id="email-subject" class="w-full p-2 border border-gray-300 rounded-lg" 
                 value="${emailTemplate.subject.replace('{{CANDIDATE_NAME}}', candidate.candidateName)}">
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea id="email-body" class="w-full p-2 border border-gray-300 rounded-lg h-48">${emailPreview}</textarea>
        </div>
        <div class="flex justify-between">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600" checked>
              <span class="ml-2 text-sm text-gray-700">Add to CRM</span>
            </label>
          </div>
          <div class="space-x-2">
            <button id="cancel-email-btn" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button id="send-email-btn" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(emailDialog);
  
  // Add event listeners
  document.getElementById('close-email-dialog').addEventListener('click', function() {
    document.body.removeChild(emailDialog);
  });
  
  document.getElementById('cancel-email-btn').addEventListener('click', function() {
    document.body.removeChild(emailDialog);
  });
  
  document.getElementById('send-email-btn').addEventListener('click', function() {
    showToast('Email sent to ' + candidate.candidateName, 'success');
    document.body.removeChild(emailDialog);
  });
  
  // Handle clicks outside the dialog
  emailDialog.addEventListener('click', function(e) {
    if (e.target === emailDialog) {
      document.body.removeChild(emailDialog);
    }
  });
}

// Sample data functions for demo
function getSampleJobDescription(jobId) {
  const jobDescriptions = {
    '1': `Senior Software Engineer

Job Description:
We are seeking an experienced Senior Software Engineer to join our dynamic team. The ideal candidate will have a strong background in software development, with a focus on building scalable and maintainable applications.

Responsibilities:
- Design, develop, and maintain software applications
- Collaborate with cross-functional teams to define, design, and ship new features
- Write clean, maintainable, and efficient code
- Review code and provide constructive feedback to other developers
- Troubleshoot and fix bugs in production environments
- Mentor junior engineers and provide technical leadership
- Implement automated testing to ensure functionality and performance
- Optimize application for maximum speed and scalability
- Stay up-to-date with emerging trends and technologies

Requirements:
- 5+ years of experience in software development
- Strong proficiency in JavaScript, TypeScript, React, and Node.js
- Experience with cloud services (AWS, Azure, or GCP)
- Experience with CI/CD pipelines and automated testing
- Knowledge of database technologies (SQL, NoSQL)
- Understanding of software development methodologies (Agile, Scrum)
- Excellent problem-solving and communication skills
- Bachelor's degree in Computer Science or equivalent experience

Preferred Qualifications:
- Experience with microservices architecture
- Knowledge of containerization tools (Docker, Kubernetes)
- Experience with GraphQL and REST API design
- Contributions to open-source projects
- Experience with real-time data processing

We offer:
- Competitive salary and benefits package
- Flexible work arrangements (hybrid or remote options)
- Professional development opportunities
- Collaborative and innovative work environment
- Health insurance, 401(k) with company match
- Paid time off and parental leave

About Us:
We are a technology company focused on building innovative solutions that help businesses grow. Our team is passionate about creating high-quality software that solves real-world problems. We value diversity, continuous learning, and work-life balance.

Location: 
San Francisco, CA (hybrid) or Remote

Employment Type: 
Full-time`,

    '2': `Product Designer

Job Description:
We are looking for a creative and user-focused Product Designer to join our growing design team. In this role, you will be responsible for creating intuitive and engaging user experiences for our digital products.

Responsibilities:
- Create user-centered designs by understanding business requirements, user feedback, and user research
- Design flows, prototypes, and high-fidelity visual designs for our products
- Create and maintain design systems
- Collaborate with product managers, engineers, and other designers to define features and iterate on designs
- Conduct user research and usability testing
- Present design solutions to stakeholders and incorporate feedback
- Stay up-to-date with the latest UI/UX trends, techniques, and technologies

Requirements:
- 3+ years of experience in product design or UX/UI design
- Strong portfolio demonstrating your design process and solutions
- Proficiency in design tools such as Figma, Sketch, or Adobe XD
- Experience with creating wireframes, prototypes, and visual designs
- Understanding of user-centered design principles
- Strong communication and presentation skills
- Ability to work collaboratively in a fast-paced environment
- Bachelor's degree in Design, Human-Computer Interaction, or related field

Preferred Qualifications:
- Experience with design systems and component libraries
- Knowledge of HTML/CSS for better collaboration with developers
- Experience with interaction design and motion design
- Background in user research and usability testing
- Experience with accessibility standards and inclusive design

We offer:
- Competitive salary and equity options
- Health, dental, and vision insurance
- Flexible work environment (hybrid or remote)
- Professional development budget
- Creative work environment with collaborative team
- Regular team events and activities

About Us:
We are a product-led company focused on creating exceptional user experiences. Our team values creativity, collaboration, and continuous improvement. We believe that great design is at the heart of successful products.

Location: 
New York, NY (hybrid) or Remote

Employment Type: 
Full-time`,

    '3': `Marketing Specialist

Job Description:
We are seeking a talented Marketing Specialist to join our marketing team. The ideal candidate will help develop and implement marketing strategies to promote our brand and drive customer engagement.

Responsibilities:
- Plan and execute digital marketing campaigns across multiple channels
- Create and optimize content for our website, blog, and social media platforms
- Manage email marketing campaigns and newsletters
- Implement SEO/SEM strategies to increase website traffic
- Monitor and analyze campaign performance using analytics tools
- Collaborate with the design team to create marketing materials
- Stay up-to-date with digital marketing trends and best practices
- Assist in organizing events and promotional activities
- Support the broader marketing team in achieving departmental goals

Requirements:
- 2+ years of experience in digital marketing
- Proficiency in digital marketing platforms and tools
- Experience with content creation and management
- Knowledge of SEO/SEM principles
- Familiarity with analytics tools (Google Analytics, etc.)
- Strong written and verbal communication skills
- Excellent organizational and time management abilities
- Bachelor's degree in Marketing, Communications, or related field

Preferred Qualifications:
- Experience with marketing automation platforms
- Knowledge of graphic design principles and tools
- Experience with paid advertising campaigns
- Social media management experience
- Understanding of CRM systems
- Certifications in Google Analytics, Google Ads, or HubSpot

We offer:
- Competitive salary and performance bonuses
- Comprehensive benefits package
- Professional development opportunities
- Collaborative work environment
- Work-life balance with flexible hours
- Casual dress code and modern office space

About Us:
We are a growing company dedicated to helping businesses connect with their customers through innovative marketing solutions. Our team is passionate about creativity, data-driven strategies, and achieving measurable results.

Location: 
Austin, TX (in-office) or Remote

Employment Type: 
Full-time`
  };
  
  return jobDescriptions[jobId] || "No job description available for this position.";
}

// Generate realistic candidate data
function getSampleCandidates(jobId, pool) {
  // Base pool of candidates
  const allCandidates = [
    {
      id: 'CAND001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      currentTitle: 'Senior Software Engineer',
      currentCompany: 'Tech Innovations Inc.',
      skills: [
        'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
        'MongoDB', 'AWS', 'Docker', 'CI/CD', 'Agile', 'Team Leadership'
      ],
      experience: {
        totalYears: 7,
        seniorityLevel: 'Senior Level',
        positions: [
          {
            title: 'Senior Software Engineer',
            company: 'Tech Innovations Inc.',
            duration: '3 years'
          },
          {
            title: 'Software Engineer',
            company: 'Digital Solutions LLC',
            duration: '4 years'
          }
        ],
        industries: ['Technology', 'Finance']
      },
      education: {
        highestDegree: 'Master\'s Degree',
        fields: ['Computer Science'],
        university: 'Cornell University',
        gradYear: 2016
      },
      rawText: `
        John Smith
        Senior Software Engineer
        john.smith@example.com | (555) 123-4567 | New York, NY
        
        SUMMARY
        Experienced software engineer with 7+ years in full-stack development, specializing in JavaScript, TypeScript, React, and Node.js. Strong AWS cloud infrastructure expertise.
        
        EXPERIENCE
        Tech Innovations Inc. - Senior Software Engineer
        2020 - Present (3 years)
        - Led a team of 5 developers in building scalable microservices architecture
        - Implemented CI/CD pipelines resulting in 40% faster deployment cycles
        - Optimized MongoDB database queries leading to 30% performance improvement
        - Mentored junior developers and conducted code reviews
        
        Digital Solutions LLC - Software Engineer
        2016 - 2020 (4 years)
        - Developed responsive web applications using React and Redux
        - Built RESTful APIs with Node.js and Express
        - Collaborated with UX designers to implement intuitive user interfaces
        - Deployed and maintained AWS cloud infrastructure
        
        EDUCATION
        Cornell University - Master's in Computer Science, 2016
        University of Michigan - Bachelor's in Computer Science, 2014
        
        SKILLS
        JavaScript, TypeScript, React, Node.js, Express, MongoDB, AWS, Docker, CI/CD, Agile, Team Leadership
      `
    },
    {
      id: 'CAND002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(555) 234-5678',
      location: 'San Francisco, CA',
      currentTitle: 'Full Stack Developer',
      currentCompany: 'WebTech Solutions',
      skills: [
        'JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 
        'Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'
      ],
      experience: {
        totalYears: 5,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Full Stack Developer',
            company: 'WebTech Solutions',
            duration: '3 years'
          },
          {
            title: 'Frontend Developer',
            company: 'Creative Digital',
            duration: '2 years'
          }
        ],
        industries: ['Technology', 'E-commerce']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Computer Science'],
        university: 'UC Berkeley',
        gradYear: 2018
      },
      rawText: `
        Sarah Johnson
        Full Stack Developer
        sarah.johnson@example.com | (555) 234-5678 | San Francisco, CA
        
        PROFESSIONAL SUMMARY
        Full stack developer with 5 years of experience building modern web applications. Proficient in multiple frontend frameworks including React, Angular, and Vue.js. Strong backend skills with Node.js and Python.
        
        EXPERIENCE
        WebTech Solutions - Full Stack Developer
        2020 - Present (3 years)
        - Developed and maintained e-commerce platforms serving 100K+ daily users
        - Created microservices using Node.js and Express
        - Implemented responsive UIs using React and Redux
        - Containerized applications with Docker and deployed on Kubernetes
        
        Creative Digital - Frontend Developer
        2018 - 2020 (2 years)
        - Built interactive web applications using Angular
        - Collaborated with backend team to integrate APIs
        - Improved page load performance by 35%
        - Implemented unit and integration tests using Jest
        
        EDUCATION
        UC Berkeley - Bachelor of Science in Computer Science, 2018
        
        SKILLS
        JavaScript, React, Angular, Vue.js, Node.js, Python, Django, PostgreSQL, Docker, Kubernetes
      `
    },
    {
      id: 'CAND003',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(555) 345-6789',
      location: 'Seattle, WA',
      currentTitle: 'DevOps Engineer',
      currentCompany: 'Cloud Systems Inc.',
      skills: [
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 
        'Jenkins', 'GitHub Actions', 'Python', 'Bash', 'Linux Administration'
      ],
      experience: {
        totalYears: 6,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'DevOps Engineer',
            company: 'Cloud Systems Inc.',
            duration: '3 years'
          },
          {
            title: 'Systems Administrator',
            company: 'TechOps Solutions',
            duration: '3 years'
          }
        ],
        industries: ['Technology', 'Cloud Infrastructure']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Information Technology'],
        university: 'University of Washington',
        gradYear: 2017
      },
      rawText: `
        Michael Chen
        DevOps Engineer
        michael.chen@example.com | (555) 345-6789 | Seattle, WA
        
        SUMMARY
        DevOps engineer with 6 years of experience in cloud infrastructure and automation. Expert in AWS, Docker, Kubernetes, and CI/CD pipelines. Strong problem-solving and troubleshooting skills.
        
        EXPERIENCE
        Cloud Systems Inc. - DevOps Engineer
        2020 - Present (3 years)
        - Designed and implemented infrastructure as code using Terraform
        - Managed AWS and GCP cloud environments for enterprise clients
        - Automated deployment pipelines with Jenkins and GitHub Actions
        - Reduced deployment time by 60% and infrastructure costs by 25%
        
        TechOps Solutions - Systems Administrator
        2017 - 2020 (3 years)
        - Managed Linux server environments for 20+ clients
        - Implemented monitoring and alerting systems
        - Automated routine tasks using Python and Bash scripts
        - Migrated on-premise infrastructure to cloud platforms
        
        EDUCATION
        University of Washington - Bachelor's in Information Technology, 2017
        
        SKILLS
        AWS, Azure, GCP, Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, Python, Bash, Linux Administration
      `
    },
    {
      id: 'CAND004',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '(555) 456-7890',
      location: 'Austin, TX',
      currentTitle: 'Backend Developer',
      currentCompany: 'Data Systems LLC',
      skills: [
        'Python', 'Java', 'Spring Boot', 'Django', 'Flask', 
        'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'AWS'
      ],
      experience: {
        totalYears: 4,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Backend Developer',
            company: 'Data Systems LLC',
            duration: '2 years'
          },
          {
            title: 'Software Developer',
            company: 'Tech Solutions Inc.',
            duration: '2 years'
          }
        ],
        industries: ['Technology', 'Data Management']
      },
      education: {
        highestDegree: 'Master\'s Degree',
        fields: ['Computer Engineering'],
        university: 'University of Texas',
        gradYear: 2019
      },
      rawText: `
        Emily Rodriguez
        Backend Developer
        emily.rodriguez@example.com | (555) 456-7890 | Austin, TX
        
        PROFESSIONAL SUMMARY
        Backend developer with 4 years of experience specializing in Python and Java. Strong database knowledge and API development skills. Experienced in designing scalable and maintainable software systems.
        
        EXPERIENCE
        Data Systems LLC - Backend Developer
        2021 - Present (2 years)
        - Developed and maintained REST APIs using Django and Flask
        - Designed database schemas and optimized queries for PostgreSQL
        - Implemented message queue systems with RabbitMQ
        - Created data processing pipelines for large datasets
        
        Tech Solutions Inc. - Software Developer
        2019 - 2021 (2 years)
        - Built microservices using Java and Spring Boot
        - Integrated with third-party APIs and payment gateways
        - Implemented caching strategies using Redis
        - Collaborated with frontend team to design API contracts
        
        EDUCATION
        University of Texas - Master's in Computer Engineering, 2019
        Texas A&M University - Bachelor's in Computer Science, 2017
        
        SKILLS
        Python, Java, Spring Boot, Django, Flask, PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, AWS
      `
    },
    {
      id: 'CAND005',
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '(555) 567-8901',
      location: 'Chicago, IL',
      currentTitle: 'Frontend Developer',
      currentCompany: 'UI Innovations',
      skills: [
        'JavaScript', 'TypeScript', 'React', 'Redux', 'Angular', 
        'HTML5', 'CSS3', 'SASS', 'Bootstrap', 'Tailwind CSS', 'Figma'
      ],
      experience: {
        totalYears: 3,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Frontend Developer',
            company: 'UI Innovations',
            duration: '1.5 years'
          },
          {
            title: 'UI Developer',
            company: 'Web Creations',
            duration: '1.5 years'
          }
        ],
        industries: ['Technology', 'Design']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Web Development'],
        university: 'DePaul University',
        gradYear: 2020
      },
      rawText: `
        David Kim
        Frontend Developer
        david.kim@example.com | (555) 567-8901 | Chicago, IL
        
        SUMMARY
        Creative frontend developer with 3 years of experience crafting responsive and intuitive user interfaces. Proficient in React, Angular, and modern CSS frameworks. Passionate about user experience and accessibility.
        
        EXPERIENCE
        UI Innovations - Frontend Developer
        2021 - Present (1.5 years)
        - Developed responsive web applications using React and Redux
        - Created reusable component libraries to ensure UI consistency
        - Implemented complex animations and transitions
        - Collaborated with UX designers to translate mockups into code
        
        Web Creations - UI Developer
        2020 - 2021 (1.5 years)
        - Built interactive user interfaces using Angular
        - Created responsive layouts with Bootstrap and SASS
        - Optimized frontend performance
        - Implemented cross-browser compatibility
        
        EDUCATION
        DePaul University - Bachelor's in Web Development, 2020
        
        SKILLS
        JavaScript, TypeScript, React, Redux, Angular, HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, Figma
      `
    },
    {
      id: 'CAND006',
      name: 'Olivia Wilson',
      email: 'olivia.wilson@example.com',
      phone: '(555) 678-9012',
      location: 'Boston, MA',
      currentTitle: 'Product Designer',
      currentCompany: 'Design Innovations',
      skills: [
        'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 
        'Figma', 'Sketch', 'Adobe XD', 'InVision', 'HTML/CSS', 'Design Systems'
      ],
      experience: {
        totalYears: 5,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Product Designer',
            company: 'Design Innovations',
            duration: '2 years'
          },
          {
            title: 'UX Designer',
            company: 'Creative Solutions',
            duration: '3 years'
          }
        ],
        industries: ['Design', 'Technology']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Graphic Design', 'Human-Computer Interaction'],
        university: 'Rhode Island School of Design',
        gradYear: 2018
      },
      rawText: `
        Olivia Wilson
        Product Designer
        olivia.wilson@example.com | (555) 678-9012 | Boston, MA
        
        PROFESSIONAL SUMMARY
        Experienced product designer with 5 years in creating intuitive and engaging user experiences. Skilled in user research, interaction design, and visual design. Passionate about solving complex design problems.
        
        EXPERIENCE
        Design Innovations - Product Designer
        2021 - Present (2 years)
        - Led end-to-end design process for multiple products
        - Conducted user research and usability testing
        - Created wireframes, prototypes, and high-fidelity mockups
        - Developed and maintained design systems
        
        Creative Solutions - UX Designer
        2018 - 2021 (3 years)
        - Designed user interfaces for web and mobile applications
        - Collaborated with product managers to define requirements
        - Created user flows and journey maps
        - Implemented design thinking methodologies
        
        EDUCATION
        Rhode Island School of Design - Bachelor's in Graphic Design, 2018
        MIT OpenCourseWare - Certificate in Human-Computer Interaction, 2019
        
        SKILLS
        UI/UX Design, User Research, Wireframing, Prototyping, Figma, Sketch, Adobe XD, InVision, HTML/CSS, Design Systems
      `
    },
    {
      id: 'CAND007',
      name: 'Daniel Martinez',
      email: 'daniel.martinez@example.com',
      phone: '(555) 789-0123',
      location: 'Denver, CO',
      currentTitle: 'Software Engineer',
      currentCompany: 'Mountain Tech',
      skills: [
        'C#', '.NET Core', 'ASP.NET', 'SQL Server', 'Entity Framework', 
        'REST APIs', 'Azure', 'JavaScript', 'Angular', 'Microservices'
      ],
      experience: {
        totalYears: 6,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Software Engineer',
            company: 'Mountain Tech',
            duration: '3 years'
          },
          {
            title: 'Developer',
            company: 'Enterprise Solutions',
            duration: '3 years'
          }
        ],
        industries: ['Technology', 'Enterprise Software']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Computer Science'],
        university: 'University of Colorado',
        gradYear: 2017
      },
      rawText: `
        Daniel Martinez
        Software Engineer
        daniel.martinez@example.com | (555) 789-0123 | Denver, CO
        
        SUMMARY
        Software engineer with 6 years of experience specializing in .NET and Azure development. Skilled in building scalable web applications and microservices. Strong problem-solving abilities and attention to detail.
        
        EXPERIENCE
        Mountain Tech - Software Engineer
        2020 - Present (3 years)
        - Developed enterprise web applications using ASP.NET Core and Entity Framework
        - Designed and implemented RESTful APIs for mobile and web clients
        - Deployed and managed applications on Azure
        - Implemented CI/CD pipelines and automated testing
        
        Enterprise Solutions - Developer
        2017 - 2020 (3 years)
        - Built and maintained internal business applications
        - Migrated legacy systems to modern architecture
        - Optimized SQL Server database performance
        - Collaborated with business analysts to gather requirements
        
        EDUCATION
        University of Colorado - Bachelor's in Computer Science, 2017
        
        SKILLS
        C#, .NET Core, ASP.NET, SQL Server, Entity Framework, REST APIs, Azure, JavaScript, Angular, Microservices
      `
    },
    {
      id: 'CAND008',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@example.com',
      phone: '(555) 890-1234',
      location: 'Atlanta, GA',
      currentTitle: 'Data Scientist',
      currentCompany: 'Analytics Insights',
      skills: [
        'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 
        'TensorFlow', 'PyTorch', 'Data Visualization', 'Statistics', 'Pandas', 'NumPy'
      ],
      experience: {
        totalYears: 4,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Data Scientist',
            company: 'Analytics Insights',
            duration: '2 years'
          },
          {
            title: 'Data Analyst',
            company: 'Business Intelligence Inc.',
            duration: '2 years'
          }
        ],
        industries: ['Data Analytics', 'Finance']
      },
      education: {
        highestDegree: 'Master\'s Degree',
        fields: ['Statistics', 'Data Science'],
        university: 'Georgia Tech',
        gradYear: 2019
      },
      rawText: `
        Lisa Thompson
        Data Scientist
        lisa.thompson@example.com | (555) 890-1234 | Atlanta, GA
        
        PROFESSIONAL SUMMARY
        Data scientist with 4 years of experience applying statistical modeling and machine learning to solve business problems. Experienced in predictive modeling, natural language processing, and data visualization.
        
        EXPERIENCE
        Analytics Insights - Data Scientist
        2021 - Present (2 years)
        - Developed machine learning models to predict customer behavior
        - Created data pipelines for automated data processing
        - Performed exploratory data analysis to identify patterns
        - Communicated insights to stakeholders through visualizations
        
        Business Intelligence Inc. - Data Analyst
        2019 - 2021 (2 years)
        - Analyzed large datasets to extract business insights
        - Created dashboards using Tableau and Power BI
        - Performed SQL queries to extract and manipulate data
        - Supported decision-making with data-driven recommendations
        
        EDUCATION
        Georgia Tech - Master's in Data Science, 2019
        University of Georgia - Bachelor's in Statistics, 2017
        
        SKILLS
        Python, R, SQL, Machine Learning, Deep Learning, TensorFlow, PyTorch, Data Visualization, Statistics, Pandas, NumPy
      `
    }
  ];
  
  // Additional candidates for specific job types
  const engineeringCandidates = [
    {
      id: 'CAND009',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(555) 901-2345',
      location: 'Remote',
      currentTitle: 'Senior Software Engineer',
      currentCompany: 'Global Tech Solutions',
      skills: [
        'JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL', 
        'AWS', 'Serverless', 'MongoDB', 'Redis', 'Docker', 'Git'
      ],
      experience: {
        totalYears: 8,
        seniorityLevel: 'Senior Level',
        positions: [
          {
            title: 'Senior Software Engineer',
            company: 'Global Tech Solutions',
            duration: '3 years'
          },
          {
            title: 'Full Stack Developer',
            company: 'Web Platforms Inc.',
            duration: '5 years'
          }
        ],
        industries: ['Technology', 'E-commerce', 'Finance']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Computer Science'],
        university: 'MIT',
        gradYear: 2015
      },
      rawText: `
        Robert Johnson
        Senior Software Engineer
        robert.johnson@example.com | (555) 901-2345 | Remote
        
        SUMMARY
        Seasoned software engineer with 8 years of experience in full-stack development. Specialized in building scalable web applications with modern JavaScript frameworks. Strong background in cloud architecture and DevOps practices.
        
        EXPERIENCE
        Global Tech Solutions - Senior Software Engineer
        2020 - Present (3 years)
        - Led the development of a high-traffic e-commerce platform
        - Architected serverless backend infrastructure on AWS
        - Implemented GraphQL API serving 2M+ requests daily
        - Mentored junior developers and established coding standards
        
        Web Platforms Inc. - Full Stack Developer
        2015 - 2020 (5 years)
        - Built responsive web applications using React and Redux
        - Developed RESTful APIs with Node.js and Express
        - Implemented automated testing and CI/CD pipelines
        - Optimized application performance and reliability
        
        EDUCATION
        MIT - Bachelor's in Computer Science, 2015
        
        SKILLS
        JavaScript, TypeScript, React, Node.js, GraphQL, AWS, Serverless, MongoDB, Redis, Docker, Git
      `
    },
    {
      id: 'CAND010',
      name: 'Jennifer Lee',
      email: 'jennifer.lee@example.com',
      phone: '(555) 012-3456',
      location: 'San Jose, CA',
      currentTitle: 'Backend Engineer',
      currentCompany: 'Enterprise Systems',
      skills: [
        'Java', 'Spring Boot', 'Microservices', 'Kafka', 'MySQL', 
        'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'JUnit', 'CI/CD'
      ],
      experience: {
        totalYears: 6,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Backend Engineer',
            company: 'Enterprise Systems',
            duration: '3 years'
          },
          {
            title: 'Java Developer',
            company: 'Software Solutions Ltd.',
            duration: '3 years'
          }
        ],
        industries: ['Enterprise Software', 'FinTech']
      },
      education: {
        highestDegree: 'Master\'s Degree',
        fields: ['Software Engineering'],
        university: 'Stanford University',
        gradYear: 2017
      },
      rawText: `
        Jennifer Lee
        Backend Engineer
        jennifer.lee@example.com | (555) 012-3456 | San Jose, CA
        
        PROFESSIONAL SUMMARY
        Backend engineer with 6 years of experience building robust and scalable microservices. Expert in Java and Spring ecosystem. Strong background in distributed systems and event-driven architecture.
        
        EXPERIENCE
        Enterprise Systems - Backend Engineer
        2020 - Present (3 years)
        - Designed and implemented microservices architecture
        - Built event-driven systems using Kafka for high-throughput data processing
        - Optimized database performance and query execution
        - Integrated with third-party APIs and services
        
        Software Solutions Ltd. - Java Developer
        2017 - 2020 (3 years)
        - Developed backend services for financial applications
        - Implemented RESTful APIs following industry best practices
        - Created comprehensive test suites with JUnit and Mockito
        - Deployed applications to cloud platforms
        
        EDUCATION
        Stanford University - Master's in Software Engineering, 2017
        UC Davis - Bachelor's in Computer Science, 2015
        
        SKILLS
        Java, Spring Boot, Microservices, Kafka, MySQL, PostgreSQL, Docker, Kubernetes, AWS, JUnit, CI/CD
      `
    }
  ];
  
  const designCandidates = [
    {
      id: 'CAND011',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '(555) 123-4567',
      location: 'Portland, OR',
      currentTitle: 'Product Designer',
      currentCompany: 'Creative Design Co.',
      skills: [
        'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 
        'Figma', 'Sketch', 'Adobe Creative Suite', 'Design Systems',
        'Interaction Design', 'Usability Testing', 'HTML/CSS'
      ],
      experience: {
        totalYears: 7,
        seniorityLevel: 'Senior Level',
        positions: [
          {
            title: 'Senior Product Designer',
            company: 'Creative Design Co.',
            duration: '4 years'
          },
          {
            title: 'UI Designer',
            company: 'Digital Arts Agency',
            duration: '3 years'
          }
        ],
        industries: ['Design', 'Technology', 'E-commerce']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Graphic Design', 'Human-Computer Interaction'],
        university: 'Rhode Island School of Design',
        gradYear: 2016
      },
      rawText: `
        James Wilson
        Product Designer
        james.wilson@example.com | (555) 123-4567 | Portland, OR
        
        SUMMARY
        Creative product designer with 7 years of experience creating user-centered digital experiences. Expert in design systems and iterative design processes. Passionate about accessibility and inclusive design.
        
        EXPERIENCE
        Creative Design Co. - Senior Product Designer
        2019 - Present (4 years)
        - Led design strategy for flagship products with 500K+ users
        - Created and maintained design system used across multiple products
        - Conducted user research and usability testing
        - Collaborated with engineering teams on implementation
        
        Digital Arts Agency - UI Designer
        2016 - 2019 (3 years)
        - Designed interfaces for web and mobile applications
        - Created wireframes and interactive prototypes
        - Developed visual design language for brands
        - Collaborated with clients to define requirements
        
        EDUCATION
        Rhode Island School of Design - Bachelor's in Graphic Design, 2016
        Stanford Online - Certificate in Human-Computer Interaction, 2018
        
        SKILLS
        UI/UX Design, User Research, Wireframing, Prototyping, Figma, Sketch, Adobe Creative Suite, Design Systems, Interaction Design, Usability Testing, HTML/CSS
      `
    }
  ];
  
  const marketingCandidates = [
    {
      id: 'CAND012',
      name: 'Amanda Garcia',
      email: 'amanda.garcia@example.com',
      phone: '(555) 234-5678',
      location: 'Miami, FL',
      currentTitle: 'Marketing Specialist',
      currentCompany: 'Brand Builders Inc.',
      skills: [
        'Digital Marketing', 'Content Strategy', 'SEO', 'SEM', 'Social Media Marketing',
        'Email Marketing', 'Google Analytics', 'Facebook Ads', 'Content Creation',
        'Marketing Automation', 'CRM', 'A/B Testing'
      ],
      experience: {
        totalYears: 5,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Marketing Specialist',
            company: 'Brand Builders Inc.',
            duration: '3 years'
          },
          {
            title: 'Digital Marketing Coordinator',
            company: 'Growth Marketing Agency',
            duration: '2 years'
          }
        ],
        industries: ['Marketing', 'Retail', 'E-commerce']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Marketing', 'Business Administration'],
        university: 'University of Florida',
        gradYear: 2018
      },
      rawText: `
        Amanda Garcia
        Marketing Specialist
        amanda.garcia@example.com | (555) 234-5678 | Miami, FL
        
        PROFESSIONAL SUMMARY
        Results-driven marketing specialist with 5 years of experience in digital marketing. Skilled in creating and executing multi-channel marketing campaigns. Passionate about data-driven marketing strategies.
        
        EXPERIENCE
        Brand Builders Inc. - Marketing Specialist
        2020 - Present (3 years)
        - Developed and executed comprehensive digital marketing strategies
        - Managed SEO/SEM campaigns resulting in 45% increase in organic traffic
        - Created and optimized content for multiple channels
        - Analyzed campaign performance using Google Analytics and other tools
        
        Growth Marketing Agency - Digital Marketing Coordinator
        2018 - 2020 (2 years)
        - Assisted in planning and implementing marketing campaigns for clients
        - Managed social media accounts and created engaging content
        - Conducted keyword research and competitor analysis
        - Prepared performance reports for clients
        
        EDUCATION
        University of Florida - Bachelor's in Marketing, 2018
        HubSpot Academy - Inbound Marketing Certification, 2019
        Google - Analytics Certification, 2020
        
        SKILLS
        Digital Marketing, Content Strategy, SEO, SEM, Social Media Marketing, Email Marketing, Google Analytics, Facebook Ads, Content Creation, Marketing Automation, CRM, A/B Testing
      `
    },
    {
      id: 'CAND013',
      name: 'Thomas Brown',
      email: 'thomas.brown@example.com',
      phone: '(555) 345-6789',
      location: 'Chicago, IL',
      currentTitle: 'Content Marketing Manager',
      currentCompany: 'Content Solutions',
      skills: [
        'Content Strategy', 'Content Creation', 'Copywriting', 'Blogging',
        'SEO', 'Social Media', 'Email Marketing', 'Marketing Analytics',
        'Editorial Planning', 'WordPress', 'Video Production', 'Brand Messaging'
      ],
      experience: {
        totalYears: 6,
        seniorityLevel: 'Mid Level',
        positions: [
          {
            title: 'Content Marketing Manager',
            company: 'Content Solutions',
            duration: '3 years'
          },
          {
            title: 'Content Specialist',
            company: 'Digital Media Group',
            duration: '3 years'
          }
        ],
        industries: ['Marketing', 'Media', 'Technology']
      },
      education: {
        highestDegree: 'Bachelor\'s Degree',
        fields: ['Communications', 'Journalism'],
        university: 'Northwestern University',
        gradYear: 2017
      },
      rawText: `
        Thomas Brown
        Content Marketing Manager
        thomas.brown@example.com | (555) 345-6789 | Chicago, IL
        
        SUMMARY
        Experienced content marketing manager with 6 years of experience creating engaging content across multiple platforms. Skilled in developing content strategies that drive engagement and conversions. Strong editorial and SEO background.
        
        EXPERIENCE
        Content Solutions - Content Marketing Manager
        2020 - Present (3 years)
        - Developed and implemented content marketing strategies
        - Managed editorial calendar and content production workflow
        - Created SEO-optimized content that increased organic traffic by 75%
        - Supervised a team of writers and content creators
        
        Digital Media Group - Content Specialist
        2017 - 2020 (3 years)
        - Created blog posts, whitepapers, and social media content
        - Conducted keyword research and implemented SEO best practices
        - Collaborated with design team on visual content
        - Analyzed content performance metrics
        
        EDUCATION
        Northwestern University - Bachelor's in Communications, 2017
        Minor in Business Administration
        
        SKILLS
        Content Strategy, Content Creation, Copywriting, Blogging, SEO, Social Media, Email Marketing, Marketing Analytics, Editorial Planning, WordPress, Video Production, Brand Messaging
      `
    }
  ];
  
  // Select candidates based on job ID and pool
  let selectedCandidates = [];
  
  // Select job-specific candidates
  if (jobId === '1') { // Software Engineer
    selectedCandidates = [...allCandidates.slice(0, 5), ...engineeringCandidates];
  } else if (jobId === '2') { // Product Designer
    selectedCandidates = [...allCandidates.slice(2, 7), ...designCandidates];
  } else if (jobId === '3') { // Marketing Specialist
    selectedCandidates = [...allCandidates.slice(4, 8), ...marketingCandidates];
  } else {
    selectedCandidates = allCandidates;
  }
  
  // Filter by pool if needed
  if (pool === 'new') {
    // Simulate new applicants with most recent candidates
    selectedCandidates = selectedCandidates.slice(0, 8);
  } else if (pool === 'unscreened') {
    // Simulate unscreened applicants
    selectedCandidates = selectedCandidates.slice(0, 12);
  }
  
  return selectedCandidates;
}

// Chat system
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
        addChatMessage(message, 'recruiter');
        messageInput.value = '';
        
        // Simulate reply after delay
        setTimeout(() => {
          // Sample responses
          const responses = [
            "Thank you for reaching out. I'm very interested in the position!",
            "I'm available for an interview next Tuesday or Wednesday afternoon.",
            "Could you tell me more about the team I'd be working with?",
            "I have experience with most of the technologies mentioned in the job description.",
            "Thanks for the feedback. I'll update my portfolio with more recent projects."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addChatMessage(randomResponse, 'candidate');
        }, 2000);
      }
    });
  }
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  let html = '';
  
  if (sender === 'recruiter') {
    html = `
      <div class="flex items-start justify-end mb-4">
        <div class="bg-indigo-600 text-white p-3 rounded-lg max-w-xs">
          <p>${message}</p>
          <span class="text-xs text-indigo-200 block text-right mt-1">
            ${getCurrentTime()}
          </span>
        </div>
        <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Recruiter" class="w-8 h-8 rounded-full ml-3">
      </div>
    `;
  } else {
    html = `
      <div class="flex items-start mb-4">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Candidate" class="w-8 h-8 rounded-full mr-3">
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

// Notifications system
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
}

// Helper functions
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Hide the page loader when everything is loaded
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.style.opacity = 0;
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 500);
    }, 1000);
  }

  // Set the current date
  const currentDateElement = document.getElementById('current-date');
  if (currentDateElement) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
  }

  initializeDashboardCharts();  initializeJobManagement();
  initializeCandidateManagement();
  initializeInterviewScheduling();
  initializeAIAssistant();
  initializeAIJobScreening();
  initializeNotifications();
  
  // Simulate a real-time notification after some time
  setTimeout(() => {
    const notificationBadge = document.getElementById('notification-badge');
    if (notificationBadge) {
      notificationBadge.classList.remove('hidden');
      showToast('New application received for Senior Developer position', 'info');
    }
  }, 5000);
});
