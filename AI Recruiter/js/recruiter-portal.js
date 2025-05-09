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
    });
  }
  
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

function generateAIResponse(prompt) {
  const aiResponseContainer = document.getElementById('ai-response-container');
  if (!aiResponseContainer) return;
  
  let response = '';
  
  // Different responses based on prompt content
  if (prompt.toLowerCase().includes('job description')) {
    response = `
      <h3 class="font-semibold text-lg mb-2">Senior Software Engineer Job Description</h3>
      <p class="mb-2">We're looking for a Senior Software Engineer to join our growing team. In this role, you will:</p>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>Design and implement scalable, high-performance software solutions</li>
        <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
        <li>Mentor junior engineers and provide technical leadership</li>
        <li>Perform code reviews and maintain code quality across the team</li>
        <li>Troubleshoot and fix bugs in production environments</li>
      </ul>
      <h4 class="font-medium mb-1">Requirements:</h4>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>5+ years of experience in software development</li>
        <li>Strong proficiency in JavaScript, TypeScript, React, and Node.js</li>
        <li>Experience with cloud services (AWS, Azure, or GCP)</li>
        <li>Experience with CI/CD pipelines and automated testing</li>
        <li>Bachelor's degree in Computer Science or equivalent experience</li>
      </ul>
      <p>Would you like me to adjust this description or create another one for a different position?</p>
    `;
  } else if (prompt.toLowerCase().includes('interview question')) {
    response = `
      <h3 class="font-semibold text-lg mb-2">Technical Interview Questions for Software Engineers</h3>
      <p class="mb-3">Here are some insightful questions to evaluate Software Engineer candidates:</p>
      <ol class="list-decimal pl-5 mb-3 space-y-2">
        <li>
          <div class="font-medium">Problem-solving approach:</div>
          <div>Describe a complex technical problem you encountered and how you solved it. What was your thought process?</div>
        </li>
        <li>
          <div class="font-medium">System design:</div>
          <div>How would you design a scalable image upload service that can handle millions of uploads per day?</div>
        </li>
        <li>
          <div class="font-medium">Code quality:</div>
          <div>What practices do you follow to ensure your code is maintainable and reliable?</div>
        </li>
        <li>
          <div class="font-medium">Technical depth:</div>
          <div>Explain how JavaScript promises work and give an example of when you'd use them over callbacks.</div>
        </li>
        <li>
          <div class="font-medium">Learning ability:</div>
          <div>Describe a time when you had to quickly learn a new technology for a project. How did you approach it?</div>
        </li>
      </ol>
      <p>Would you like behavioral questions as well, or questions for a different role?</p>
    `;
  } else if (prompt.toLowerCase().includes('find candidate') || prompt.toLowerCase().includes('search')) {
    response = `
      <h3 class="font-semibold text-lg mb-2">Candidate Search Strategy</h3>
      <p class="mb-3">To find high-quality candidates for your open positions, I recommend a multi-channel approach:</p>
      <div class="space-y-3">
        <div class="p-3 bg-indigo-50 rounded-lg">
          <h4 class="font-medium text-indigo-700 mb-1">1. Optimize your job descriptions</h4>
          <p class="text-sm">Use inclusive language, highlight growth opportunities, and clearly define responsibilities. Focus on what candidates will learn and achieve, not just requirements.</p>
        </div>
        <div class="p-3 bg-indigo-50 rounded-lg">
          <h4 class="font-medium text-indigo-700 mb-1">2. Leverage employee referrals</h4>
          <p class="text-sm">Employee referrals typically have a higher success rate. Consider implementing a referral bonus program and making it easy for employees to share job openings.</p>
        </div>
        <div class="p-3 bg-indigo-50 rounded-lg">
          <h4 class="font-medium text-indigo-700 mb-1">3. Engage passive candidates</h4>
          <p class="text-sm">Use LinkedIn Recruiter to search for candidates with relevant skills and experience. Personalize your outreach messages to increase response rates.</p>
        </div>
        <div class="p-3 bg-indigo-50 rounded-lg">
          <h4 class="font-medium text-indigo-700 mb-1">4. Attend industry events</h4>
          <p class="text-sm">Virtual and in-person tech conferences, meetups, and hackathons are great places to meet passionate professionals in your field.</p>
        </div>
      </div>
      <p class="mt-3">Would you like me to help you craft personalized outreach messages or optimize specific job descriptions?</p>
    `;
  } else {
    response = `
      <h3 class="font-semibold text-lg mb-2">TalentAI Assistant</h3>
      <p class="mb-3">I'm here to help you with your recruiting tasks. Here are some ways I can assist you:</p>
      <ul class="list-disc pl-5 mb-3 space-y-1">
        <li>Draft job descriptions tailored to your company's needs</li>
        <li>Generate appropriate interview questions for different roles</li>
        <li>Suggest strategies for finding qualified candidates</li>
        <li>Create templates for candidate outreach messages</li>
        <li>Provide advice on evaluating candidates fairly</li>
        <li>Suggest competitive compensation ranges based on market data</li>
      </ul>
      <p>Feel free to ask me about any of these topics or something else related to your recruiting needs.</p>
    `;
  }
  
  aiResponseContainer.innerHTML = `
    <div class="bg-gray-100 p-4 rounded-lg mb-4">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-3">
          <div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <i class="fas fa-robot"></i>
          </div>
        </div>
        <div class="flex-1">
          ${response}
        </div>
      </div>
    </div>
  `;
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

  initializeDashboardCharts();
  initializeJobManagement();
  initializeCandidateManagement();
  initializeInterviewScheduling();
  initializeAIAssistant();
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
