/**
 * AI Job Screening Multi-Agent System
 * A framework of coordinated AI agents that work together to screen job applicants
 */

// Main Agent Orchestrator
class AgentOrchestrator {
    constructor() {
        this.agents = {
            jdAnalysis: new JDAnalysisAgent(),
            cvAnalysis: new CVAnalysisAgent(),
            matching: new MatchingAgent(),
            shortlisting: new ShortlistingAgent(),
            communication: new CommunicationAgent()
        };
        this.workflow = null;
        this.currentJobId = null;
        this.candidates = [];
        this.jobDescription = null;
        this.analysisResults = {};
        this.matchResults = {};
        this.shortlistedCandidates = [];
    }

    // Start the screening process for a job
    startScreening(jobId, jobDescription, candidates) {
        this.currentJobId = jobId;
        this.jobDescription = jobDescription;
        this.candidates = candidates;
        this.analysisResults = {};
        this.matchResults = {};
        this.shortlistedCandidates = [];

        // Create and visualize workflow
        this.createWorkflow();
        this.visualizeWorkflow();

        // Start the workflow
        return this.executeWorkflow();
    }

    // Create the agent workflow
    createWorkflow() {
        this.workflow = [
            {
                name: "JD Analysis",
                agent: "jdAnalysis",
                status: "pending",
                description: "Analyzing job description to extract key requirements, skills, and qualifications",
                action: () => this.agents.jdAnalysis.analyzeJobDescription(this.jobDescription)
            },
            {
                name: "CV Analysis",
                agent: "cvAnalysis",
                status: "pending",
                description: "Extracting information from candidate resumes and standardizing data",
                action: () => this.agents.cvAnalysis.analyzeCandidates(this.candidates)
            },
            {
                name: "Candidate Matching",
                agent: "matching",
                status: "pending",
                description: "Matching candidate profiles against job requirements and calculating match scores",
                action: () => this.agents.matching.matchCandidates(
                    this.analysisResults.jdAnalysis,
                    this.analysisResults.cvAnalysis
                )
            },
            {
                name: "Shortlisting",
                agent: "shortlisting",
                status: "pending",
                description: "Ranking candidates based on match scores and generating recommendations",
                action: () => this.agents.shortlisting.shortlistCandidates(
                    this.matchResults,
                    this.analysisResults.jdAnalysis
                )
            },
            {
                name: "Communication",
                agent: "communication",
                status: "pending",
                description: "Preparing personalized communication templates for shortlisted candidates",
                action: () => this.agents.communication.prepareEmailTemplates(
                    this.shortlistedCandidates,
                    this.analysisResults.jdAnalysis
                )
            }
        ];
    }

    // Visualize the workflow in the UI
    visualizeWorkflow() {
        const workflowContainer = document.getElementById('agent-workflow');
        if (!workflowContainer) return;
        
        workflowContainer.innerHTML = '';
        
        this.workflow.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'flex items-center mb-3';
            stepElement.innerHTML = `
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 
                            ${this.getStatusColor(step.status)}">
                    <span class="text-xs font-bold">${index + 1}</span>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center">
                        <h4 class="font-medium text-sm">${step.name}</h4>
                        <span class="text-xs ${this.getStatusTextColor(step.status)}">${this.getStatusLabel(step.status)}</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">${step.description}</p>
                </div>
            `;
            
            workflowContainer.appendChild(stepElement);
            
            // Add connector if not the last step
            if (index < this.workflow.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'ml-4 h-6 border-l border-gray-200';
                workflowContainer.appendChild(connector);
            }
        });
        
        // Also initialize the agent logs
        this.initAgentLogs();
    }
    
    // Initialize agent logs
    initAgentLogs() {
        const logsContainer = document.getElementById('agent-logs');
        if (!logsContainer) return;
        
        logsContainer.innerHTML = `
            <div class="text-xs text-gray-500">
                <i class="fas fa-info-circle mr-1"></i>
                System initialized. Ready to begin screening process.
            </div>
        `;
    }
    
    // Add a log message
    addLogMessage(message, type = 'info') {
        const logsContainer = document.getElementById('agent-logs');
        if (!logsContainer) return;
        
        const logItem = document.createElement('div');
        logItem.className = `text-xs ${type === 'error' ? 'text-red-500' : type === 'success' ? 'text-green-500' : 'text-gray-500'} mt-1`;
        
        // Add timestamp and icon
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        let icon = 'info-circle';
        if (type === 'error') icon = 'exclamation-circle';
        else if (type === 'success') icon = 'check-circle';
        else if (type === 'warning') icon = 'exclamation-triangle';
        
        logItem.innerHTML = `
            <span class="text-gray-400">[${timestamp}]</span>
            <i class="fas fa-${icon} mr-1"></i>
            ${message}
        `;
        
        logsContainer.appendChild(logItem);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    // Get status color for visualization
    getStatusColor(status) {
        switch (status) {
            case 'completed': return 'bg-green-500 text-white';
            case 'processing': return 'bg-indigo-500 text-white';
            case 'error': return 'bg-red-500 text-white';
            case 'pending': 
            default: return 'bg-gray-200 text-gray-600';
        }
    }
    
    // Get status text color
    getStatusTextColor(status) {
        switch (status) {
            case 'completed': return 'text-green-600';
            case 'processing': return 'text-indigo-600';
            case 'error': return 'text-red-600';
            case 'pending': 
            default: return 'text-gray-500';
        }
    }
    
    // Get status label
    getStatusLabel(status) {
        switch (status) {
            case 'completed': return 'Completed';
            case 'processing': return 'Processing...';
            case 'error': return 'Error';
            case 'pending': 
            default: return 'Pending';
        }
    }

    // Execute the workflow step by step
    async executeWorkflow() {
        try {
            this.addLogMessage('Starting screening workflow for job ID: ' + this.currentJobId);
            
            // Step 1: JD Analysis
            this.addLogMessage('Starting job description analysis');
            await this.executeStep(0);
            this.addLogMessage('Job description analysis completed', 'success');
            
            // Step 2: CV Analysis
            this.addLogMessage(`Analyzing ${this.candidates.length} candidate profiles`);
            await this.executeStep(1);
            this.addLogMessage('Candidate profile analysis completed', 'success');
            
            // Step 3: Candidate Matching
            this.addLogMessage('Matching candidates against job requirements');
            await this.executeStep(2);
            
            const matchStats = `${this.matchResults.highMatches} high matches, ${this.matchResults.mediumMatches} medium matches, ${this.matchResults.lowMatches} low matches`;
            this.addLogMessage(`Matching complete: ${matchStats}`, 'success');
            
            // Step 4: Shortlisting
            this.addLogMessage('Shortlisting candidates based on match scores');
            await this.executeStep(3);
            this.addLogMessage(`Shortlisted ${this.shortlistedCandidates.length} candidates`, 'success');
            
            // Step 5: Communication
            this.addLogMessage('Preparing communication templates');
            await this.executeStep(4);
            this.addLogMessage('Email templates prepared for shortlisted candidates', 'success');
            
            this.addLogMessage('Screening workflow completed successfully', 'success');
            return {
                success: true,
                message: "Screening workflow completed successfully",
                shortlistedCandidates: this.shortlistedCandidates,
                matchStats: {
                    totalCandidates: this.candidates.length,
                    highMatches: this.matchResults.highMatches,
                    mediumMatches: this.matchResults.mediumMatches,
                    lowMatches: this.matchResults.lowMatches
                }
            };
        } catch (error) {
            console.error("Workflow execution failed:", error);
            this.addLogMessage(`Workflow error: ${error.message}`, 'error');
            return {
                success: false,
                message: "Screening workflow failed: " + error.message
            };
        }
    }

    // Execute a single workflow step
    async executeStep(stepIndex) {
        const step = this.workflow[stepIndex];
        if (!step) return;
        
        // Update UI to show in-progress status
        this.updateStepStatus(stepIndex, "processing", "Processing...");
        
        try {
            // Execute the step action
            const result = await step.action();
            
            // Store the results based on agent type
            if (step.agent === "jdAnalysis") {
                this.analysisResults.jdAnalysis = result;
                this.addLogMessage(`JD Analysis extracted ${result.skills.technical.length} technical skills, ${result.skills.soft.length} soft skills`);
            } else if (step.agent === "cvAnalysis") {
                this.analysisResults.cvAnalysis = result;
                this.addLogMessage(`CV Analysis processed ${result.candidateProfiles.length} candidates`);
            } else if (step.agent === "matching") {
                this.matchResults = result;
                this.addLogMessage(`Matching complete with average score of ${this.calculateAverageScore(result.matches)}%`);
            } else if (step.agent === "shortlisting") {
                this.shortlistedCandidates = result;
                this.addLogMessage(`Top candidate: ${result[0].candidateName} with ${result[0].matchScore}% match`);
            } else if (step.agent === "communication") {
                this.addLogMessage('Created personalized email templates for shortlisted candidates');
            }
            
            // Update UI to show completed status
            this.updateStepStatus(stepIndex, "completed", "Completed");
            
            return result;
        } catch (error) {
            console.error(`Error executing step ${step.name}:`, error);
            this.updateStepStatus(stepIndex, "error", "Error: " + error.message);
            this.addLogMessage(`Error in ${step.name}: ${error.message}`, 'error');
            throw error; // Propagate error to stop workflow
        }
    }
    
    // Calculate average match score for logging
    calculateAverageScore(matches) {
        if (matches.length === 0) return 0;
        const sum = matches.reduce((total, match) => total + match.matchScore, 0);
        return Math.round(sum / matches.length);
    }

    // Update step status in the UI
    updateStepStatus(stepIndex, status, message) {
        const statusElement = document.getElementById(`step-status-${stepIndex}`);
        if (!statusElement) return;
        
        // Update the workflow data
        this.workflow[stepIndex].status = status;
        
        // Update the UI
        statusElement.className = `status-badge status-${status}`;
        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        
        // Emit event for monitoring
        this.emitEvent('stepStatusChange', {
            step: this.workflow[stepIndex].name,
            status: status,
            message: message
        });
    }

    // Update step details in the UI
    updateStepDetails(stepIndex, result) {
        const detailsElement = document.getElementById(`step-details-${stepIndex}`);
        if (!detailsElement) return;
        
        // Format details based on step type
        let detailsHtml = '';
        
        switch (this.workflow[stepIndex].agent) {
            case 'jdAnalysis':
                detailsHtml = `
                    <div class="font-medium mt-2">Key Requirements:</div>
                    <ul class="ml-4 list-disc">
                        ${result.keyRequirements.slice(0, 3).map(req => `<li>${req}</li>`).join('')}
                        ${result.keyRequirements.length > 3 ? `<li>+ ${result.keyRequirements.length - 3} more</li>` : ''}
                    </ul>
                `;
                break;
                
            case 'cvAnalysis':
                detailsHtml = `
                    <div>Analyzed ${result.candidatesAnalyzed} candidate profiles</div>
                    <div class="mt-1">Extracted an average of ${result.avgSkillsExtracted} skills per candidate</div>
                `;
                break;
                
            case 'matching':
                detailsHtml = `
                    <div class="grid grid-cols-3 gap-2 mt-2">
                        <div class="text-center">
                            <div class="font-medium text-green-600">${result.highMatches}</div>
                            <div class="text-xs">High Matches</div>
                        </div>
                        <div class="text-center">
                            <div class="font-medium text-yellow-600">${result.mediumMatches}</div>
                            <div class="text-xs">Medium Matches</div>
                        </div>
                        <div class="text-center">
                            <div class="font-medium text-red-600">${result.lowMatches}</div>
                            <div class="text-xs">Low Matches</div>
                        </div>
                    </div>
                `;
                break;
                
            case 'shortlisting':
                detailsHtml = `
                    <div>Shortlisted ${result.length} candidates</div>
                    <div class="mt-1">Average match score: ${result.reduce((acc, candidate) => acc + candidate.matchScore, 0) / result.length}%</div>
                `;
                break;
                
            case 'communication':
                detailsHtml = `
                    <div>${result.sent} interview requests sent</div>
                    <div class="mt-1">Template: ${result.templateUsed}</div>
                `;
                break;
                
            default:
                detailsHtml = `<div>Completed</div>`;
        }
        
        detailsElement.innerHTML = detailsHtml;
    }

    // Event emission for monitoring and logging
    emitEvent(eventName, data) {
        const event = new CustomEvent('aiAgentEvent', {
            detail: {
                eventName: eventName,
                timestamp: new Date(),
                jobId: this.currentJobId,
                data: data
            }
        });
        document.dispatchEvent(event);
        
        // Also update the agent logs
        this.updateAgentLogs(eventName, data);
    }

    // Update the agent logs in the UI
    updateAgentLogs(eventName, data) {
        const logsContainer = document.getElementById('agent-logs');
        if (!logsContainer) return;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry border-b border-gray-100 py-2';
        
        const timestamp = new Date().toLocaleTimeString();
        logEntry.innerHTML = `
            <div class="flex items-start">
                <span class="text-xs text-gray-400 w-16">${timestamp}</span>
                <div class="flex-1">
                    <div class="font-medium text-sm">${data.step || eventName}</div>
                    <div class="text-xs text-gray-600">${data.message || JSON.stringify(data)}</div>
                </div>
                <span class="text-xs px-2 py-1 rounded-full status-badge status-${data.status || 'info'}">${data.status || 'info'}</span>
            </div>
        `;
        
        // Add the new log at the top
        if (logsContainer.firstChild) {
            logsContainer.insertBefore(logEntry, logsContainer.firstChild);
        } else {
            logsContainer.appendChild(logEntry);
        }
        
        // Limit the number of visible logs
        const maxLogs = 10;
        const logs = logsContainer.querySelectorAll('.log-entry');
        if (logs.length > maxLogs) {
            for (let i = maxLogs; i < logs.length; i++) {
                logsContainer.removeChild(logs[i]);
            }
        }
    }
}

// JD Analysis Agent
class JDAnalysisAgent {
    async analyzeJobDescription(jobDescription) {
        // Simulate processing time
        await this.simulateProcessing(1500);
        
        // Extract key information from job description
        const keyRequirements = this.extractRequirements(jobDescription);
        const skills = this.extractSkills(jobDescription);
        const experience = this.extractExperience(jobDescription);
        const education = this.extractEducation(jobDescription);
        const jobType = this.identifyJobType(jobDescription);
        const locations = this.extractLocations(jobDescription);
        const benefitsInfo = this.extractBenefits(jobDescription);
        
        return {
            title: this.extractJobTitle(jobDescription),
            summary: this.generateSummary(jobDescription),
            keyRequirements: keyRequirements,
            skills: skills,
            experience: experience,
            education: education,
            jobType: jobType,
            locations: locations,
            benefits: benefitsInfo,
            rawText: jobDescription,
            keyPhrases: this.extractKeyPhrases(jobDescription),
            entities: this.extractNamedEntities(jobDescription)
        };
    }
    
    extractJobTitle(text) {
        // Extract the job title from the job description
        const firstLines = text.split('\n').filter(line => line.trim().length > 0).slice(0, 3);
        
        // The first non-empty line is likely the job title
        return firstLines[0] || "Position Title";
    }
    
    extractRequirements(text) {
        // In a real implementation, this would use NLP to extract requirements
        // Enhanced version - extract requirements based on section headers and bullet points
        
        const requirements = [];
        
        // Look for requirements section
        const sections = this.identifySections(text);
        let requirementsSection = "";
        
        if (sections.requirements) {
            requirementsSection = sections.requirements;
        } else if (sections.qualifications) {
            requirementsSection = sections.qualifications;
        }
        
        // If requirements section was found, process it
        if (requirementsSection) {
            // Extract bullet points and sentences
            const bulletPattern = /[•\-\*]?\s*([^•\-\*\n]+)/g;
            let match;
            
            while ((match = bulletPattern.exec(requirementsSection)) !== null) {
                const requirement = match[1].trim();
                if (requirement && requirement.length > 10) {
                    requirements.push(requirement);
                }
            }
        }
        
        // If no structured requirements found, fall back to keyword detection
        if (requirements.length < 3) {
            // Keyword-based requirement detection
            if (text.toLowerCase().includes('javascript')) {
                requirements.push('JavaScript proficiency');
            }
            
            if (text.toLowerCase().includes('react')) {
                requirements.push('React.js experience');
            }
            
            if (text.toLowerCase().includes('node')) {
                requirements.push('Node.js expertise');
            }
            
            if (text.toLowerCase().includes('devops') || text.toLowerCase().includes('ci/cd')) {
                requirements.push('DevOps experience');
            }
            
            if (text.toLowerCase().includes('aws') || text.toLowerCase().includes('azure') || 
                text.toLowerCase().includes('cloud')) {
                requirements.push('Cloud infrastructure knowledge');
            }
            
            if (text.toLowerCase().includes('team') || text.toLowerCase().includes('collaboration')) {
                requirements.push('Team collaboration skills');
            }
            
            if (text.toLowerCase().includes('problem solving') || text.toLowerCase().includes('analytical')) {
                requirements.push('Problem-solving abilities');
            }
            
            if (text.toLowerCase().includes('communication')) {
                requirements.push('Strong communication skills');
            }
            
            if (text.toLowerCase().includes('bachelor') || text.toLowerCase().includes('degree')) {
                requirements.push('Relevant educational background');
            }
        }
        
        return requirements;
    }
    
    extractSkills(text) {
        // More enhanced skill extraction using a combination of techniques
        const technicalSkills = new Set();
        const softSkills = new Set();
        const domainSkills = new Set();
        
        // Common technical skills to look for
        const techSkillList = [
            'javascript', 'typescript', 'react', 'angular', 'vue', 'node.js', 'express',
            'python', 'java', 'c#', 'c++', 'php', 'ruby', 'go', 'rust', 'swift',
            'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
            'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
            'rest api', 'graphql', 'microservices', 'serverless',
            'html', 'css', 'sass', 'tailwind', 'bootstrap',
            'git', 'github', 'gitlab', 'bitbucket',
            'ci/cd', 'jenkins', 'github actions', 'travis',
            'agile', 'scrum', 'kanban', 'jira'
        ];
        
        // Common soft skills
        const softSkillList = [
            'communication', 'teamwork', 'collaboration', 'leadership',
            'problem solving', 'critical thinking', 'analytical',
            'time management', 'organization', 'detail-oriented',
            'creativity', 'adaptability', 'flexibility', 'resilience',
            'conflict resolution', 'emotional intelligence', 'interpersonal',
            'presentation', 'public speaking', 'writing'
        ];
        
        // Common domain skills (varies by industry)
        const domainSkillList = [
            'product management', 'ux/ui design', 'user experience', 
            'digital marketing', 'seo', 'content strategy', 'social media',
            'data analysis', 'business intelligence', 'data science', 'machine learning',
            'sales', 'customer service', 'account management',
            'finance', 'accounting', 'budgeting', 'forecasting',
            'project management', 'risk management', 'quality assurance'
        ];
        
        // Check for mentions of skills in the full text
        const lowerText = text.toLowerCase();
        
        // Look for technical skills
        techSkillList.forEach(skill => {
            if (lowerText.includes(skill)) {
                technicalSkills.add(this.capitalizeFirstLetter(skill));
            }
        });
        
        // Look for soft skills
        softSkillList.forEach(skill => {
            if (lowerText.includes(skill)) {
                softSkills.add(this.capitalizeFirstLetter(skill));
            }
        });
        
        // Look for domain skills
        domainSkillList.forEach(skill => {
            if (lowerText.includes(skill)) {
                domainSkills.add(this.capitalizeFirstLetter(skill));
            }
        });
        
        return {
            technical: Array.from(technicalSkills),
            soft: Array.from(softSkills),
            domain: Array.from(domainSkills)
        };
    }
    
    extractExperience(text) {
        // Enhanced experience extraction
        const lowerText = text.toLowerCase();
        
        // Try to find years of experience requirements
        let yearsRequired = 0;
        
        // Patterns to match experience requirements
        const experiencePatterns = [
            /(\d+)\+?\s*(?:year|yr)s?\s+(?:of\s+)?experience/i,
            /(\d+)\+?\s*(?:year|yr)s?\s+(?:of\s+)?work\s+experience/i,
            /experience\s*:\s*(\d+)\+?\s*(?:year|yr)s?/i,
            /(?:minimum|min)\.?\s+(\d+)\+?\s*(?:year|yr)s?\s+(?:of\s+)?experience/i
        ];
        
        // Check each pattern
        for (const pattern of experiencePatterns) {
            const match = lowerText.match(pattern);
            if (match && match[1]) {
                const years = parseInt(match[1], 10);
                if (years > yearsRequired) {
                    yearsRequired = years;
                }
            }
        }
        
        // Determine seniority level
        let seniorityLevel = 'Not Specified';
        
        if (lowerText.includes('senior') || lowerText.includes('lead') || lowerText.includes('principal')) {
            seniorityLevel = 'Senior Level';
        } else if (lowerText.includes('mid') || lowerText.includes('intermediate')) {
            seniorityLevel = 'Mid Level';
        } else if (lowerText.includes('junior') || lowerText.includes('entry')) {
            seniorityLevel = 'Junior';
        } else if (lowerText.includes('intern') || lowerText.includes('trainee')) {
            seniorityLevel = 'Internship';
        } else if (yearsRequired >= 5) {
            seniorityLevel = 'Senior Level';
        } else if (yearsRequired >= 2) {
            seniorityLevel = 'Mid Level';
        } else if (yearsRequired > 0) {
            seniorityLevel = 'Junior';
        }
        
        // Extract industries mentioned in the text
        const industries = [];
        const commonIndustries = [
            'finance', 'banking', 'healthcare', 'insurance', 'retail', 'e-commerce',
            'technology', 'telecom', 'education', 'manufacturing', 'automotive',
            'entertainment', 'media', 'advertising', 'consulting', 'government', 
            'non-profit', 'energy', 'hospitality', 'real estate', 'logistics'
        ];
        
        commonIndustries.forEach(industry => {
            if (lowerText.includes(industry)) {
                industries.push(this.capitalizeFirstLetter(industry));
            }
        });
        
        return {
            yearsRequired: yearsRequired,
            seniorityLevel: seniorityLevel,
            industries: industries
        };
    }
    
    extractEducation(text) {
        // Enhanced education extraction
        const lowerText = text.toLowerCase();
        
        // Determine minimum education
        let minimumEducation = 'Not Specified';
        
        // Check for PhD requirement
        if (lowerText.includes('phd') || lowerText.includes('doctorate')) {
            minimumEducation = 'PhD';
        } 
        // Check for Master's requirement
        else if (lowerText.includes('master') || lowerText.includes('ms ') || lowerText.includes('m.s.') || 
                lowerText.includes('msc') || lowerText.includes('m.sc')) {
            minimumEducation = 'Master\'s Degree';
        } 
        // Check for Bachelor's requirement
        else if (lowerText.includes('bachelor') || lowerText.includes('bs ') || lowerText.includes('b.s.') || 
                lowerText.includes('ba ') || lowerText.includes('b.a.') || lowerText.includes('undergraduate')) {
            minimumEducation = 'Bachelor\'s Degree';
        } 
        // Check for Associate's
        else if (lowerText.includes('associate')) {
            minimumEducation = 'Associate\'s Degree';
        } 
        // Check for high school
        else if (lowerText.includes('high school') || lowerText.includes('ged')) {
            minimumEducation = 'High School';
        }
        
        // Extract relevant fields of study
        const relevantFields = [];
        
        // Common fields to look for
        const fieldList = [
            'computer science', 'information technology', 'information systems',
            'software engineering', 'computer engineering', 'electrical engineering',
            'mathematics', 'statistics', 'data science', 'business administration',
            'finance', 'accounting', 'marketing', 'communications', 'psychology',
            'human resources', 'design', 'graphic design', 'ux design', 'ui design'
        ];
        
        fieldList.forEach(field => {
            if (lowerText.includes(field)) {
                relevantFields.push(this.capitalizeFirstLetter(field));
            }
        });
        
        // Check for "or equivalent" phrasing
        const hasEquivalentClause = lowerText.includes('or equivalent') || 
                                   lowerText.includes('or related field') ||
                                   lowerText.includes('or similar');
        
        return {
            minimumEducation: minimumEducation,
            relevantFields: relevantFields,
            equivalentExperienceAccepted: hasEquivalentClause
        };
    }
    
    identifyJobType(text) {
        // Identify job type (full-time, part-time, contract, etc.)
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('full-time') || lowerText.includes('fulltime') || lowerText.includes('full time')) {
            return 'Full-time';
        } else if (lowerText.includes('part-time') || lowerText.includes('parttime') || lowerText.includes('part time')) {
            return 'Part-time';
        } else if (lowerText.includes('contract') || lowerText.includes('contractor')) {
            return 'Contract';
        } else if (lowerText.includes('freelance')) {
            return 'Freelance';
        } else if (lowerText.includes('intern') || lowerText.includes('internship')) {
            return 'Internship';
        } else if (lowerText.includes('temporary') || lowerText.includes('temp')) {
            return 'Temporary';
        } else {
            // Default to full-time as it's most common
            return 'Full-time';
        }
    }
    
    extractLocations(text) {
        // Extract location information from the job description
        const lowerText = text.toLowerCase();
        const locations = [];
        
        // Check for remote work indicators
        if (lowerText.includes('remote') || lowerText.includes('work from home') || lowerText.includes('wfh')) {
            locations.push('Remote');
        }
        
        // Check for hybrid work
        if (lowerText.includes('hybrid')) {
            locations.push('Hybrid');
        }
        
        // Check for on-site work
        if (lowerText.includes('on-site') || lowerText.includes('onsite') || lowerText.includes('in office')) {
            locations.push('On-site');
        }
        
        // Common cities to look for
        const majorCities = [
            'new york', 'san francisco', 'chicago', 'los angeles', 'boston',
            'seattle', 'austin', 'denver', 'atlanta', 'miami', 'washington dc',
            'dallas', 'houston', 'phoenix', 'philadelphia', 'san diego', 'london',
            'toronto', 'vancouver', 'paris', 'berlin', 'sydney', 'melbourne',
            'tokyo', 'singapore'
        ];
        
        majorCities.forEach(city => {
            if (lowerText.includes(city)) {
                locations.push(this.capitalizeFirstLetter(city));
            }
        });
        
        return locations.length > 0 ? locations : ['Not specified'];
    }
    
    extractBenefits(text) {
        // Extract benefits mentioned in the job description
        const lowerText = text.toLowerCase();
        const benefits = [];
        
        // Common benefits to look for
        const benefitsList = [
            'health insurance', 'health care', 'healthcare', 'medical', 'dental', 'vision',
            '401k', 'retirement', 'pension', 'stock options', 'equity', 'bonus', 'commission',
            'paid time off', 'pto', 'vacation', 'sick leave', 'parental leave', 'maternity', 'paternity',
            'flexible schedule', 'flexible hours', 'flexible working', 'remote work', 'work from home',
            'professional development', 'training', 'tuition', 'reimbursement', 'gym membership',
            'wellness', 'mental health', 'relocation'
        ];
        
        benefitsList.forEach(benefit => {
            if (lowerText.includes(benefit)) {
                benefits.push(this.capitalizeFirstLetter(benefit));
            }
        });
        
        return benefits;
    }
    
    extractKeyPhrases(text) {
        // In a real implementation, this would use an NLP library to extract key phrases
        // For this demo, we'll extract sentences that contain important keywords
        
        const keyPhrases = [];
        
        // Split text into sentences
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        
        // Important keywords to look for
        const keywords = [
            'required', 'skills', 'experience', 'responsibilities', 'qualifications', 
            'must have', 'essential', 'preferred', 'bonus', 'plus', 'ideal candidate'
        ];
        
        // Find sentences with important keywords
        sentences.forEach(sentence => {
            const lowerSentence = sentence.toLowerCase();
            
            for (const keyword of keywords) {
                if (lowerSentence.includes(keyword)) {
                    const cleanSentence = sentence.trim();
                    if (cleanSentence.length > 0 && !keyPhrases.includes(cleanSentence)) {
                        keyPhrases.push(cleanSentence);
                        break; // Only add each sentence once
                    }
                }
            }
        });
        
        return keyPhrases.slice(0, 10); // Return top 10 key phrases
    }
    
    extractNamedEntities(text) {
        // In a real implementation, this would use an NLP library for entity recognition
        // For this demo, we'll identify some basic entities like technologies, job titles, and companies
        
        const entities = {
            technologies: [],
            jobTitles: [],
            companies: [],
            degrees: []
        };
        
        const lowerText = text.toLowerCase();
        
        // Common technologies
        const techList = [
            'javascript', 'python', 'java', 'c#', 'c++', 'ruby', 'go', 'rust', 'php',
            'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
            'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
            'sql', 'postgresql', 'mysql', 'mongodb', 'redis',
            'machine learning', 'artificial intelligence', 'ai', 'ml', 'nlp'
        ];
        
        // Common job titles
        const jobTitleList = [
            'software engineer', 'developer', 'programmer', 'architect',
            'data scientist', 'data analyst', 'data engineer',
            'product manager', 'project manager', 'program manager',
            'designer', 'ux designer', 'ui designer', 'graphic designer',
            'marketing manager', 'marketing specialist', 'seo specialist',
            'sales representative', 'account manager', 'business development',
            'human resources', 'hr specialist', 'recruiter',
            'financial analyst', 'accountant', 'controller',
            'director', 'vp', 'executive', 'ceo', 'cto', 'cfo', 'coo'
        ];
        
        // Common companies (could expand)
        const companyList = [
            'google', 'microsoft', 'amazon', 'apple', 'facebook', 'meta',
            'netflix', 'ibm', 'oracle', 'salesforce', 'twitter', 'linkedin',
            'uber', 'airbnb', 'adobe', 'cisco', 'intel', 'hp', 'dell',
            'goldman sachs', 'morgan stanley', 'jpmorgan', 'deloitte', 'kpmg'
        ];
        
        // Common degree types
        const degreeList = [
            'phd', 'doctorate', 'master', 'ms', 'm.s.', 'msc', 'm.sc',
            'bachelor', 'bs', 'b.s.', 'ba', 'b.a.', 'associate'
        ];
        
        // Extract entities
        techList.forEach(tech => {
            if (lowerText.includes(tech)) {
                entities.technologies.push(this.capitalizeFirstLetter(tech));
            }
        });
        
        jobTitleList.forEach(title => {
            if (lowerText.includes(title)) {
                entities.jobTitles.push(this.capitalizeFirstLetter(title));
            }
        });
        
        companyList.forEach(company => {
            if (lowerText.includes(company)) {
                entities.companies.push(this.capitalizeFirstLetter(company));
            }
        });
        
        degreeList.forEach(degree => {
            const regExp = new RegExp(`\\b${degree}\\b`, 'i');
            if (regExp.test(lowerText)) {
                entities.degrees.push(this.capitalizeFirstLetter(degree));
            }
        });
        
        // Remove duplicates and limit to top entries
        entities.technologies = Array.from(new Set(entities.technologies)).slice(0, 10);
        entities.jobTitles = Array.from(new Set(entities.jobTitles)).slice(0, 5);
        entities.companies = Array.from(new Set(entities.companies)).slice(0, 5);
        entities.degrees = Array.from(new Set(entities.degrees)).slice(0, 3);
        
        return entities;
    }
    
    identifySections(text) {
        // Identify different sections in the job description
        const sections = {};
        
        // Common section headers
        const sectionPatterns = {
            'responsibilities': /(?:Responsibilities|Duties|Job Duties|What You'll Do|Key Responsibilities|Role\s*:)(?:\s*:|$)/i,
            'requirements': /(?:Requirements|Qualifications|Required Skills|Skills Required|What You'll Need|What You Need|Must Have|Minimum Requirements|Required Qualifications)(?:\s*:|$)/i,
            'qualifications': /(?:Preferred Qualifications|Skills|Experience|Requirements)(?:\s*:|$)/i,
            'benefits': /(?:Benefits|Perks|What We Offer|We Offer|Compensation|Compensation & Benefits)(?:\s*:|$)/i,
            'company': /(?:About Us|About the Company|Who We Are|Our Company|The Company)(?:\s*:|$)/i
        };
        
        // Split text into lines for easier processing
        const lines = text.split('\n');
        let currentSection = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if the line is a section header
            let foundHeader = false;
            for (const [section, pattern] of Object.entries(sectionPatterns)) {
                if (pattern.test(line)) {
                    currentSection = section;
                    sections[section] = '';
                    foundHeader = true;
                    break;
                }
            }
            
            // If line is not a header and we have a current section, add line to section content
            if (!foundHeader && currentSection && line.length > 0) {
                sections[currentSection] += line + '\n';
            }
        }
        
        return sections;
    }
    
    generateSummary(text) {
        // In a real implementation, this would use NLP to generate a summary
        // For this demo, we'll create a summary based on the job title and first paragraph
        
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        if (lines.length === 0) {
            return "No job description available.";
        }
        
        const jobTitle = lines[0];
        
        // Find the first substantial paragraph
        let firstParagraph = "";
        for (let i = 1; i < Math.min(10, lines.length); i++) {
            const line = lines[i].trim();
            if (line.length > 50) { // Likely a paragraph, not a header
                firstParagraph = line;
                break;
            }
        }
        
        if (firstParagraph) {
            // Trim to a reasonable length
            return firstParagraph.slice(0, 200) + (firstParagraph.length > 200 ? '...' : '');
        } else {
            // Fall back to generic summary
            return `This role is for a ${jobTitle} position. The ideal candidate will have the skills and experience listed in the job requirements.`;
        }
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Helper to simulate processing time
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// CV Analysis Agent
class CVAnalysisAgent {
    async analyzeCandidates(candidates) {
        // Simulate processing time
        await this.simulateProcessing(2000);
        
        // Track metrics
        const metrics = {
            candidatesAnalyzed: candidates.length,
            totalSkillsExtracted: 0,
            avgSkillsExtracted: 0
        };
        
        // Process each candidate
        const candidateProfiles = candidates.map(candidate => {
            const profile = this.extractCandidateProfile(candidate);
            metrics.totalSkillsExtracted += profile.skills.length;
            return profile;
        });
        
        // Calculate average
        metrics.avgSkillsExtracted = Math.round(metrics.totalSkillsExtracted / candidates.length);
        
        return {
            ...metrics,
            candidateProfiles: candidateProfiles
        };
    }
    
    extractCandidateProfile(candidate) {
        // Extract structured information from CV
        const profile = {
            id: candidate.id,
            name: candidate.name,
            contact: this.extractContactInfo(candidate.cv),
            summary: this.extractSummary(candidate.cv),
            experience: this.extractExperience(candidate.cv),
            skills: this.extractSkills(candidate.cv),
            education: this.extractEducation(candidate.cv),
            rawText: candidate.cv
        };
        
        return profile;
    }
    
    extractContactInfo(text) {
        // In a real implementation, this would use regex patterns to extract contact info
        // For demo, we'll return simulated contact info
        return {
            email: 'candidate@example.com',
            phone: '(555) 123-4567',
            location: 'San Francisco, CA'
        };
    }
    
    extractSummary(text) {
        // Extract the candidate's summary/objective
        // For demo, return first 100 characters
        return text.slice(0, 100) + '...';
    }
    
    extractExperience(text) {
        // In a real implementation, this would extract work history
        // For demo, estimate total years of experience based on text length and keywords
        
        let totalYears = 0;
        
        // Count occurrences of year patterns (e.g., 2018-2020)
        const yearRangePattern = /\b(20\d{2})\s*[-–—to]*\s*(20\d{2}|present|current)\b/gi;
        let match;
        let yearRanges = [];
        
        while ((match = yearRangePattern.exec(text)) !== null) {
            const startYear = parseInt(match[1]);
            const endYear = match[2].toLowerCase() === 'present' || match[2].toLowerCase() === 'current' 
                ? new Date().getFullYear() 
                : parseInt(match[2]);
                
            if (!isNaN(startYear) && !isNaN(endYear) && endYear >= startYear) {
                yearRanges.push({
                    start: startYear,
                    end: endYear,
                    duration: endYear - startYear
                });
                totalYears += (endYear - startYear);
            }
        }
        
        // If no clear year ranges found, estimate based on text length
        if (yearRanges.length === 0) {
            totalYears = Math.floor(text.length / 1000) + 1; // Rough heuristic
            totalYears = Math.min(totalYears, 15); // Cap at reasonable maximum
        }
        
        // Determine seniority level
        let seniorityLevel = 'Entry Level';
        if (totalYears >= 8) {
            seniorityLevel = 'Senior Level';
        } else if (totalYears >= 3) {
            seniorityLevel = 'Mid Level';
        }
        
        return {
            totalYears: totalYears,
            seniorityLevel: seniorityLevel,
            positions: yearRanges.length // Rough estimate of number of positions held
        };
    }
    
    extractSkills(text) {
        // Extract skills mentioned in the CV
        const skills = [];
        
        // Common technical skills to look for
        const technicalSkills = [
            'JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js',
            'Express', 'MongoDB', 'SQL', 'MySQL', 'PostgreSQL', 'Python', 'Java',
            'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'Rust',
            'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git',
            'RESTful API', 'GraphQL', 'Microservices', 'TDD', 'Agile', 'Scrum'
        ];
        
        // Check for each skill
        technicalSkills.forEach(skill => {
            const regex = new RegExp(`\\b${skill.replace(/\./g, '\\.')}\\b`, 'i');
            if (regex.test(text)) {
                skills.push(skill);
            }
        });
        
        // Add soft skills based on keywords
        const softSkillKeywords = {
            'communication': 'Communication',
            'team': 'Teamwork',
            'lead': 'Leadership',
            'problem': 'Problem Solving',
            'detail': 'Attention to Detail',
            'time': 'Time Management',
            'adapt': 'Adaptability',
            'creat': 'Creativity'
        };
        
        Object.entries(softSkillKeywords).forEach(([keyword, skill]) => {
            if (text.toLowerCase().includes(keyword)) {
                skills.push(skill);
            }
        });
        
        return skills;
    }
    
    extractEducation(text) {
        // Extract education information
        
        // Detect degree levels
        const degreePatterns = {
            phd: /ph\.?d\.?|doctorate|doctor of philosophy/i,
            masters: /master'?s|ms|ma|m\.a\.|m\.s\.|mba|m\.b\.a\./i,
            bachelors: /bachelor'?s|bs|ba|b\.a\.|b\.s\.|undergraduate degree/i,
            associates: /associate'?s|associate degree|a\.a\.|a\.s\./i
        };
        
        // Determine highest degree
        let highestDegree = 'Not Specified';
        
        if (degreePatterns.phd.test(text)) {
            highestDegree = 'PhD';
        } else if (degreePatterns.masters.test(text)) {
            highestDegree = 'Master\'s Degree';
        } else if (degreePatterns.bachelors.test(text)) {
            highestDegree = 'Bachelor\'s Degree';
        } else if (degreePatterns.associates.test(text)) {
            highestDegree = 'Associate\'s Degree';
        }
        
        // Detect fields of study
        const fields = [];
        const fieldPatterns = [
            'Computer Science', 'Information Technology', 'Software Engineering',
            'Computer Engineering', 'Electrical Engineering', 'Information Systems',
            'Data Science', 'Mathematics', 'Statistics', 'Business', 'Marketing',
            'Finance', 'Economics', 'Psychology', 'Communications'
        ];
        
        fieldPatterns.forEach(field => {
            if (text.includes(field)) {
                fields.push(field);
            }
        });
        
        return {
            highestDegree: highestDegree,
            fields: fields
        };
    }
    
    // Helper to simulate processing time
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Matching Agent
class MatchingAgent {
    async matchCandidates(jobAnalysis, candidateAnalyses) {
        // Simulate processing time
        await this.simulateProcessing(1800);
        
        const matchResults = [];
        let highMatches = 0;
        let mediumMatches = 0;
        let lowMatches = 0;
        
        // Process each candidate
        for (const candidate of candidateAnalyses.candidateProfiles) {
            const matchScore = this.calculateMatchScore(jobAnalysis, candidate);
            const matchLevel = this.determineMatchLevel(matchScore);
            
            // Track match levels
            if (matchLevel === 'high') highMatches++;
            else if (matchLevel === 'medium') mediumMatches++;
            else lowMatches++;
            
            matchResults.push({
                candidateId: candidate.id,
                candidateName: candidate.name,
                matchScore: matchScore,
                matchLevel: matchLevel,
                strengths: this.identifyStrengths(jobAnalysis, candidate),
                gaps: this.identifyGaps(jobAnalysis, candidate),
                skillMatchDetails: this.getSkillMatchDetails(jobAnalysis, candidate),
                experienceMatchDetails: this.getExperienceMatchDetails(jobAnalysis, candidate),
                educationMatchDetails: this.getEducationMatchDetails(jobAnalysis, candidate)
            });
        }
        
        // Sort by match score (descending)
        matchResults.sort((a, b) => b.matchScore - a.matchScore);
        
        return {
            matches: matchResults,
            highMatches: highMatches,
            mediumMatches: mediumMatches,
            lowMatches: lowMatches
        };
    }
    
    calculateMatchScore(jobAnalysis, candidateProfile) {
        // Calculate a match score based on various factors
        let score = 0;
        let maxScore = 0;
        
        // 1. Skills match (weighted heavily)
        const skillsScore = this.calculateSkillsMatch(jobAnalysis.skills, candidateProfile.skills);
        score += skillsScore.score * 35; // 35% weight
        maxScore += skillsScore.maxScore * 35;
        
        // 2. Experience match
        const experienceScore = this.calculateExperienceMatch(jobAnalysis.experience, candidateProfile.experience);
        score += experienceScore.score * 25; // 25% weight
        maxScore += experienceScore.maxScore * 25;
        
        // 3. Education match
        const educationScore = this.calculateEducationMatch(jobAnalysis.education, candidateProfile.education);
        score += educationScore.score * 15; // 15% weight
        maxScore += educationScore.maxScore * 15;
        
        // 4. Keyword relevance
        const keywordScore = this.calculateKeywordRelevance(jobAnalysis, candidateProfile);
        score += keywordScore.score * 10; // 10% weight
        
        // 5. Semantic similarity (NEW)
        const semanticScore = this.calculateSemanticSimilarity(jobAnalysis, candidateProfile);
        score += semanticScore.score * 15; // 15% weight
        
        // Calculate percentage
        const percentageScore = Math.round((score / maxScore) * 100);
        
        return percentageScore;
    }
      calculateSkillsMatch(jobSkills, candidateSkills) {
        let score = 0;
        const technicalSkills = jobSkills.technical || [];
        const softSkills = jobSkills.soft || [];
        const domainSkills = jobSkills.domain || [];
        
        // Skill category weights
        const categoryWeights = {
            technical: 0.6,  // Technical skills are most important
            soft: 0.2,       // Soft skills are less weighted
            domain: 0.2      // Domain-specific knowledge
        };
        
        // Technical skills matching - with fuzzy matching
        const techMatches = this.fuzzySkillMatch(technicalSkills, candidateSkills);
        score += techMatches.score * categoryWeights.technical;
        
        // Soft skills matching
        const softMatches = this.fuzzySkillMatch(softSkills, candidateSkills);
        score += softMatches.score * categoryWeights.soft;
        
        // Domain skills matching
        const domainMatches = this.fuzzySkillMatch(domainSkills, candidateSkills);
        score += domainMatches.score * categoryWeights.domain;
        
        const maxPossibleScore = 
            (technicalSkills.length * categoryWeights.technical) + 
            (softSkills.length * categoryWeights.soft) +
            (domainSkills.length * categoryWeights.domain);
        
        return {
            score: score,
            maxScore: maxPossibleScore > 0 ? maxPossibleScore : 1,
            technicalMatches: techMatches.matches,
            softMatches: softMatches.matches,
            domainMatches: domainMatches.matches
        };
    }
    
    fuzzySkillMatch(requiredSkills, candidateSkills) {
        let matchCount = 0;
        const matches = [];
        
        for (const requiredSkill of requiredSkills) {
            const reqSkillLower = requiredSkill.toLowerCase();
            
            // Check for exact match first
            const exactMatch = candidateSkills.find(skill => 
                skill.toLowerCase() === reqSkillLower
            );
            
            if (exactMatch) {
                matchCount += 1;
                matches.push({
                    required: requiredSkill,
                    matched: exactMatch,
                    confidence: 1.0
                });
                continue;
            }
            
            // Check for partial matches
            const partialMatches = candidateSkills.filter(skill => {
                const skillLower = skill.toLowerCase();
                return skillLower.includes(reqSkillLower) || 
                       reqSkillLower.includes(skillLower);
            });
            
            if (partialMatches.length > 0) {
                // Get the best partial match
                const bestMatch = partialMatches[0];
                const confidence = 0.7; // Partial match confidence
                matchCount += confidence;
                matches.push({
                    required: requiredSkill,
                    matched: bestMatch,
                    confidence: confidence
                });
            }
            
            // Could add synonyms/related skills matching here
        }
        
        return {
            score: matchCount,
            possibleMatches: requiredSkills.length,
            matches: matches
        };
    }
    
    calculateExperienceMatch(jobExperience, candidateExperience) {
        let score = 0;
        let maxScore = 3; // Experience years + seniority level + industry relevance
        
        // Years of experience
        const requiredYears = jobExperience.yearsRequired || 0;
        const candidateYears = candidateExperience.totalYears || 0;
        
        let yearsScore = 0;
        if (candidateYears >= requiredYears) {
            yearsScore = 1;
        } else if (candidateYears >= requiredYears * 0.7) {
            // Close enough (70% of required)
            yearsScore = 0.7;
        } else if (candidateYears >= requiredYears * 0.5) {
            // Half of what's required
            yearsScore = 0.5;
        } else {
            // Some experience, but not enough
            yearsScore = 0.3;
        }
        
        // Seniority level match
        let seniorityScore = 0;
        if (jobExperience.seniorityLevel === candidateExperience.seniorityLevel) {
            seniorityScore = 1;
        } else if (
            (jobExperience.seniorityLevel === 'Mid-level' && candidateExperience.seniorityLevel === 'Senior Level') ||
            (jobExperience.seniorityLevel === 'Junior' && 
             (candidateExperience.seniorityLevel === 'Mid Level' || candidateExperience.seniorityLevel === 'Senior Level'))
        ) {
            // Candidate is overqualified - full points
            seniorityScore = 1;
        } else if (
            (jobExperience.seniorityLevel === 'Senior Level' && candidateExperience.seniorityLevel === 'Mid Level') ||
            (jobExperience.seniorityLevel === 'Mid Level' && candidateExperience.seniorityLevel === 'Junior')
        ) {
            // Candidate is slightly underqualified
            seniorityScore = 0.5;
        } else {
            // Significant mismatch
            seniorityScore = 0.2;
        }
        
        // Industry relevance (new)
        let industryScore = 0;
        const jobIndustries = jobExperience.industries || [];
        const candidateIndustries = candidateExperience.industries || [];
        
        if (jobIndustries.length === 0 || candidateIndustries.length === 0) {
            // No industry requirements or candidate hasn't specified industries
            industryScore = 0.7; // Neutral score
        } else {
            // Check for matching industries
            const matchCount = jobIndustries.filter(industry => 
                candidateIndustries.some(candIndustry => 
                    candIndustry.toLowerCase().includes(industry.toLowerCase()) ||
                    industry.toLowerCase().includes(candIndustry.toLowerCase())
                )
            ).length;
            
            industryScore = matchCount > 0 ? Math.min(1, matchCount / jobIndustries.length) : 0.2;
        }
        
        score = yearsScore + seniorityScore + industryScore;
        
        return {
            score: score,
            maxScore: maxScore,
            yearsScore: yearsScore,
            seniorityScore: seniorityScore,
            industryScore: industryScore
        };
    }
    
    calculateEducationMatch(jobEducation, candidateEducation) {
        let score = 0;
        let maxScore = 3; // Degree level + field + relevance
        
        // Education level matching
        const educationLevels = {
            'PhD': 5,
            'Master\'s Degree': 4,
            'Bachelor\'s Degree': 3,
            'Associate\'s Degree': 2,
            'High School': 1,
            'Not Specified': 0
        };
        
        const jobLevel = educationLevels[jobEducation.minimumEducation] || 0;
        const candidateLevel = educationLevels[candidateEducation.highestDegree] || 0;
        
        let degreeScore = 0;
        if (candidateLevel >= jobLevel) {
            degreeScore = 1;
        } else if (jobLevel > 0 && candidateLevel > 0) {
            // Some education, but not enough
            degreeScore = 0.5 * (candidateLevel / jobLevel);
        }
        
        // Field of study matching
        const relevantFields = jobEducation.relevantFields || [];
        const candidateFields = candidateEducation.fields || [];
        
        let fieldScore = 0;
        if (relevantFields.length > 0 && candidateFields.length > 0) {
            // Check for matching fields with partial matching
            for (const field of relevantFields) {
                const fieldLower = field.toLowerCase();
                if (candidateFields.some(f => {
                    const fLower = f.toLowerCase();
                    return fLower.includes(fieldLower) || fieldLower.includes(fLower);
                })) {
                    fieldScore += 0.5;
                }
            }
            fieldScore = Math.min(1, fieldScore); // Cap at 1
        } else if (relevantFields.length === 0) {
            // No specific fields required
            fieldScore = 1;
        }
        
        // Education recency (new)
        let recencyScore = 0;
        if (candidateEducation.gradYear) {
            const currentYear = new Date().getFullYear();
            const yearsAgo = currentYear - candidateEducation.gradYear;
            
            // More recent education gets higher score
            if (yearsAgo <= 3) {
                recencyScore = 1; // Very recent
            } else if (yearsAgo <= 7) {
                recencyScore = 0.8; // Fairly recent
            } else if (yearsAgo <= 12) {
                recencyScore = 0.6; // Not recent but not too old
            } else {
                recencyScore = 0.4; // Education from a while ago
            }
        } else {
            recencyScore = 0.5; // No graduation year specified
        }
        
        score = degreeScore + fieldScore + recencyScore;
        
        return {
            score: score,
            maxScore: maxScore,
            degreeScore: degreeScore,
            fieldScore: fieldScore,
            recencyScore: recencyScore
        };
    }
    
    calculateKeywordRelevance(jobAnalysis, candidateProfile) {
        let score = 0;
        const maxScore = 1;
        
        // Extract keywords from job requirements
        const keyRequirements = jobAnalysis.keyRequirements || [];
        const requirementText = keyRequirements.join(' ').toLowerCase();
        
        // Check if candidate profile contains these keywords
        const candidateText = candidateProfile.rawText.toLowerCase();
        const requirementWords = new Set(requirementText.match(/\b\w+\b/g) || []);
        
        let matchCount = 0;
        let totalWords = 0;
        let matches = [];
        
        requirementWords.forEach(word => {
            if (word.length >= 4) { // Only consider significant words
                totalWords++;
                if (candidateText.includes(word)) {
                    matchCount++;
                    matches.push(word);
                }
            }
        });
        
        score = totalWords > 0 ? (matchCount / totalWords) : 0;
        
        return {
            score: score,
            maxScore: maxScore,
            matches: matches
        };
    }
    
    // NEW: Calculate semantic similarity between job and candidate
    calculateSemanticSimilarity(jobAnalysis, candidateProfile) {
        // In a real implementation, this would use embeddings and vector similarity
        // For this demo, we'll simulate semantic similarity with a keyword-based approach
        
        // Extract all textual content
        const jobText = [
            jobAnalysis.summary,
            ...jobAnalysis.keyRequirements,
            ...(jobAnalysis.skills.technical || []),
            ...(jobAnalysis.skills.soft || []),
            ...(jobAnalysis.skills.domain || [])
        ].join(' ').toLowerCase();
        
        const candidateText = candidateProfile.rawText.toLowerCase();
        
        // Get job description keywords (more than 4 chars)
        const jobWords = new Set(jobText.match(/\b\w{4,}\b/g) || []);
        
        // Count matches with context
        let contextMatchCount = 0;
        let totalJobWords = 0;
        
        // Words we want to ignore in similarity (common words)
        const stopWords = new Set(['with', 'this', 'that', 'have', 'from', 'they', 'will', 'would', 'about', 'their']);
        
        jobWords.forEach(word => {
            if (!stopWords.has(word)) {
                totalJobWords++;
                
                // Check if the word appears in the candidate text with some context
                if (candidateText.includes(word)) {
                    // Get surrounding words to check context
                    const wordIndex = candidateText.indexOf(word);
                    const context = candidateText.substring(
                        Math.max(0, wordIndex - 20), 
                        Math.min(candidateText.length, wordIndex + word.length + 20)
                    );
                    
                    // If we find related terms in the context, consider it a stronger match
                    if (this.hasRelatedTerms(context, jobText)) {
                        contextMatchCount += 1.5; // Bonus for contextual match
                    } else {
                        contextMatchCount += 1;
                    }
                }
            }
        });
        
        const similarityScore = totalJobWords > 0 ? 
            Math.min(1, contextMatchCount / totalJobWords) : 0;
        
        return {
            score: similarityScore,
            maxScore: 1
        };
    }
    
    // Helper method to check if context contains related terms
    hasRelatedTerms(context, jobText) {
        // In a real implementation, you would use word embeddings to find related terms
        // For this demo, we'll use a simple approach with common term co-occurrences
        
        const commonPairs = [
            ['javascript', 'react'],
            ['react', 'component'],
            ['node', 'express'],
            ['database', 'sql'],
            ['cloud', 'aws'],
            ['experience', 'years'],
            ['design', 'interface'],
            ['team', 'collaborate'],
            ['agile', 'scrum'],
            ['bachelor', 'degree']
        ];
        
        for (const [term1, term2] of commonPairs) {
            if (context.includes(term1) && context.includes(term2) && 
                jobText.includes(term1) && jobText.includes(term2)) {
                return true;
            }
        }
        
        return false;
    }
    
    getSkillMatchDetails(jobAnalysis, candidateProfile) {
        const skillsMatch = this.calculateSkillsMatch(jobAnalysis.skills, candidateProfile.skills);
        
        return {
            technicalMatches: skillsMatch.technicalMatches || [],
            softMatches: skillsMatch.softMatches || [],
            domainMatches: skillsMatch.domainMatches || [],
            overallScore: Math.round((skillsMatch.score / skillsMatch.maxScore) * 100)
        };
    }
    
    getExperienceMatchDetails(jobAnalysis, candidateProfile) {
        const expMatch = this.calculateExperienceMatch(jobAnalysis.experience, candidateProfile.experience);
        
        return {
            yearsMatch: {
                required: jobAnalysis.experience.yearsRequired || 0,
                candidate: candidateProfile.experience.totalYears || 0,
                score: Math.round(expMatch.yearsScore * 100)
            },
            seniorityMatch: {
                required: jobAnalysis.experience.seniorityLevel,
                candidate: candidateProfile.experience.seniorityLevel,
                score: Math.round(expMatch.seniorityScore * 100)
            },
            industryMatch: {
                score: Math.round(expMatch.industryScore * 100)
            },
            overallScore: Math.round((expMatch.score / expMatch.maxScore) * 100)
        };
    }
    
    getEducationMatchDetails(jobAnalysis, candidateProfile) {
        const eduMatch = this.calculateEducationMatch(jobAnalysis.education, candidateProfile.education);
        
        return {
            degreeMatch: {
                required: jobAnalysis.education.minimumEducation,
                candidate: candidateProfile.education.highestDegree,
                score: Math.round(eduMatch.degreeScore * 100)
            },
            fieldMatch: {
                required: jobAnalysis.education.relevantFields || [],
                candidate: candidateProfile.education.fields || [],
                score: Math.round(eduMatch.fieldScore * 100)
            },
            recencyScore: Math.round(eduMatch.recencyScore * 100),
            overallScore: Math.round((eduMatch.score / eduMatch.maxScore) * 100)
        };
    }
    
    determineMatchLevel(score) {
        if (score >= 85) {
            return 'high';
        } else if (score >= 70) {
            return 'medium';
        } else {
            return 'low';
        }
    }
    
    identifyStrengths(jobAnalysis, candidateProfile) {
        const strengths = [];
        
        // Check for skill strengths
        const candidateSkills = candidateProfile.skills || [];
        const requiredTechSkills = jobAnalysis.skills.technical || [];
        const requiredSoftSkills = jobAnalysis.skills.soft || [];
        const requiredDomainSkills = jobAnalysis.skills.domain || [];
        
        // Add technical skill matches
        for (const skill of requiredTechSkills) {
            if (candidateSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
                strengths.push(`Has required skill: ${skill}`);
            }
        }
        
        // Add soft skill matches
        for (const skill of requiredSoftSkills) {
            if (candidateSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
                strengths.push(`Has soft skill: ${skill}`);
            }
        }
        
        // Add domain skill matches
        for (const skill of requiredDomainSkills) {
            if (candidateSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
                strengths.push(`Has domain expertise: ${skill}`);
            }
        }
        
        // Check for experience strengths
        const requiredYears = jobAnalysis.experience.yearsRequired || 0;
        const candidateYears = candidateProfile.experience.totalYears || 0;
        
        if (candidateYears >= requiredYears * 1.5) {
            strengths.push(`Exceeds required experience by ${candidateYears - requiredYears} years`);
        } else if (candidateYears >= requiredYears) {
            strengths.push(`Meets experience requirements (${candidateYears} years)`);
        }
        
        // Check for education strengths
        const educationLevels = {
            'PhD': 5,
            'Master\'s Degree': 4,
            'Bachelor\'s Degree': 3,
            'Associate\'s Degree': 2,
            'High School': 1,
            'Not Specified': 0
        };
        
        const reqEduLevel = educationLevels[jobAnalysis.education.minimumEducation] || 0;
        const candEduLevel = educationLevels[candidateProfile.education.highestDegree] || 0;
        
        if (candEduLevel > reqEduLevel) {
            strengths.push(`Higher education level than required`);
        }
        
        return strengths.slice(0, 5); // Return top 5 strengths
    }
    
    identifyGaps(jobAnalysis, candidateProfile) {
        const gaps = [];
        
        // Check for skill gaps
        const candidateSkills = candidateProfile.skills || [];
        const requiredTechSkills = jobAnalysis.skills.technical || [];
        const requiredSoftSkills = jobAnalysis.skills.soft || [];
        const requiredDomainSkills = jobAnalysis.skills.domain || [];
        
        // Look for missing technical skills
        for (const skill of requiredTechSkills) {
            if (!candidateSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
                gaps.push(`Missing technical skill: ${skill}`);
            }
        }
        
        // Look for missing domain skills
        for (const skill of requiredDomainSkills) {
            if (!candidateSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
                gaps.push(`Missing domain expertise: ${skill}`);
            }
        }
        
        // Check for experience gaps
        const requiredYears = jobAnalysis.experience.yearsRequired || 0;
        const candidateYears = candidateProfile.experience.totalYears || 0;
        
        if (candidateYears < requiredYears * 0.7) {
            gaps.push(`Insufficient experience: ${candidateYears} vs ${requiredYears} years required`);
        }
        
        // Check for education gaps
        const educationLevels = {
            'PhD': 5,
            'Master\'s Degree': 4,
            'Bachelor\'s Degree': 3,
            'Associate\'s Degree': 2,
            'High School': 1,
            'Not Specified': 0
        };
        
        const reqEduLevel = educationLevels[jobAnalysis.education.minimumEducation] || 0;
        const candEduLevel = educationLevels[candidateProfile.education.highestDegree] || 0;
        
        if (reqEduLevel > 0 && candEduLevel < reqEduLevel) {
            const requiredDegree = jobAnalysis.education.minimumEducation;
            gaps.push(`Education requirement not met: ${requiredDegree} required`);
        }
        
        return gaps.slice(0, 5); // Return top 5 gaps
    }
    
    // Helper to simulate processing time
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Shortlisting Agent
class ShortlistingAgent {
    async shortlistCandidates(matchResults) {
        // Simulate processing time
        await this.simulateProcessing(1200);
        
        const matches = matchResults.matches || [];
        
        // Apply shortlisting criteria
        const shortlistedCandidates = matches
            // Filter by minimum score
            .filter(candidate => candidate.matchScore >= 70)
            // Sort by score (descending)
            .sort((a, b) => b.matchScore - a.matchScore)
            // Take top candidates
            .slice(0, Math.min(matches.length, 10));
        
        // Add recommendation and priority
        return shortlistedCandidates.map((candidate, index) => ({
            ...candidate,
            shortlistRank: index + 1,
            recommendation: this.generateRecommendation(candidate, index),
            priority: this.assignPriority(candidate, index)
        }));
    }
    
    generateRecommendation(candidate, rank) {
        if (candidate.matchScore >= 90) {
            return "Strongly recommended for immediate interview";
        } else if (candidate.matchScore >= 80) {
            return "Recommended for interview";
        } else if (rank < 3) {
            return "Consider for interview based on top ranking";
        } else {
            return "Consider if top candidates are unavailable";
        }
    }
    
    assignPriority(candidate, rank) {
        if (candidate.matchScore >= 90 || rank === 0) {
            return "High";
        } else if (candidate.matchScore >= 80 || rank < 3) {
            return "Medium";
        } else {
            return "Low";
        }
    }
    
    // Helper to simulate processing time
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Communication Agent
class CommunicationAgent {
    async prepareEmailTemplates(shortlistedCandidates, jobAnalysis) {
        // Simulate processing time
        await this.simulateProcessing(1500);
        
        // Filter candidates to only high and medium priority
        const candidatesToContact = shortlistedCandidates.filter(
            candidate => candidate.priority === "High" || candidate.priority === "Medium"
        );
        
        // Generate email templates
        const template = this.selectEmailTemplate(candidatesToContact.length);
        
        // Track sent messages
        const sent = candidatesToContact.length;
        const failed = 0;
        
        // Record communication history
        const communicationHistory = candidatesToContact.map(candidate => ({
            candidateId: candidate.candidateId,
            candidateName: candidate.candidateName,
            emailSubject: `Interview Invitation: Your Application`,
            emailPreview: this.generateEmailPreview(template, candidate),
            sentTime: new Date().toISOString(),
            status: 'prepared'
        }));
        
        return {
            sent: sent,
            failed: failed,
            templateUsed: template.name,
            communicationHistory: communicationHistory
        };
    }
    
    async sendInterviewRequests(shortlistedCandidates) {
        // Simulate processing time
        await this.simulateProcessing(1500);
        
        // Filter candidates to only high and medium priority
        const candidatesToContact = shortlistedCandidates.filter(
            candidate => candidate.priority === "High" || candidate.priority === "Medium"
        );
        
        // Generate email templates
        const template = this.selectEmailTemplate(candidatesToContact.length);
        
        // Track sent messages
        const sent = candidatesToContact.length;
        const failed = 0;
        
        // Record communication history
        const communicationHistory = candidatesToContact.map(candidate => ({
            candidateId: candidate.candidateId,
            candidateName: candidate.candidateName,
            emailSubject: `Interview Invitation: Your Application`,
            emailPreview: this.generateEmailPreview(template, candidate),
            sentTime: new Date().toISOString(),
            status: 'sent'
        }));
        
        return {
            sent: sent,
            failed: failed,
            templateUsed: template.name,
            communicationHistory: communicationHistory
        };
    }
    
    selectEmailTemplate(candidateCount) {
        // Choose appropriate template based on number of candidates
        if (candidateCount > 5) {
            return {
                name: 'Batch Interview Template',
                subject: 'Interview Invitation: Your Application',
                body: `Dear {{CANDIDATE_NAME}},

We are pleased to inform you that your application has been shortlisted for the next stage of our recruitment process. Based on our AI-powered matching system, your profile shows a {{MATCH_SCORE}}% match with our requirements.

We would like to invite you to schedule an interview at your earliest convenience. Please use our scheduling system to select a time that works for you.

Best regards,
The Recruitment Team`
            };
        } else {
            return {
                name: 'Personalized Interview Template',
                subject: 'Interview Invitation: Your Application',
                body: `Dear {{CANDIDATE_NAME}},

We have reviewed your application and were particularly impressed with your background in {{STRENGTH_1}}. Your profile shows a {{MATCH_SCORE}}% match with our requirements, which places you among our top candidates.

We would like to invite you to an interview to further discuss your experience and the role. Please use our scheduling system to select a time that works for you.

Best regards,
The Recruitment Team`
            };
        }
    }
    
    generateEmailPreview(template, candidate) {
        // Replace template variables with candidate data
        let emailBody = template.body
            .replace('{{CANDIDATE_NAME}}', candidate.candidateName)
            .replace('{{MATCH_SCORE}}', candidate.matchScore);
            
        // Replace strength if available
        if (candidate.strengths && candidate.strengths.length > 0) {
            const strength = candidate.strengths[0].replace('Has required skill: ', '').replace('Has soft skill: ', '');
            emailBody = emailBody.replace('{{STRENGTH_1}}', strength);
        } else {
            emailBody = emailBody.replace('{{STRENGTH_1}}', 'relevant experience');
        }
        
        // Return preview (truncated)
        return emailBody.slice(0, 100) + '...';
    }
    
    // Helper to simulate processing time
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export the Orchestrator for use in the main application
if (typeof window !== 'undefined') {
    // Browser environment
    window.AgentOrchestrator = AgentOrchestrator;
} else {
    // Node.js environment
    module.exports = {
        AgentOrchestrator,
        JDAnalysisAgent,
        CVAnalysisAgent,
        MatchingAgent,
        ShortlistingAgent,
        CommunicationAgent
    };
}
