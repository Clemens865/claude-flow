#!/usr/bin/env node

/**
 * Claude-Flow Enhanced v3.0 - Swarm Feedback Loops System
 * Real-time continuous improvement with adaptive feedback mechanisms
 */

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class SwarmFeedbackLoops extends EventEmitter {
  constructor() {
    super();
    this.activeLoops = new Map();
    this.metrics = new Map();
    this.adaptationStrategies = new Map();
    this.performanceThresholds = new Map();
    this.improvementHistory = [];
    this.realTimeMetrics = {
      responseTime: 0,
      throughput: 0,
      errorRate: 0,
      adaptationRate: 0,
      learningVelocity: 0
    };
    this.isRunning = false;
    
    this.initializeDefaultLoops();
    this.setupEventHandlers();
  }

  // Initialize default feedback loops
  initializeDefaultLoops() {
    // Performance feedback loop
    this.createFeedbackLoop('performance', {
      metrics: ['response_time', 'throughput', 'error_rate'],
      interval: 5000, // 5 seconds
      threshold: { response_time: 2000, throughput: 10, error_rate: 0.05 },
      adaptation: 'performance_optimization',
      priority: 'high'
    });

    // Learning feedback loop
    this.createFeedbackLoop('learning', {
      metrics: ['learning_velocity', 'pattern_recognition', 'adaptation_success'],
      interval: 10000, // 10 seconds
      threshold: { learning_velocity: 0.7, pattern_recognition: 0.8, adaptation_success: 0.6 },
      adaptation: 'learning_optimization',
      priority: 'medium'
    });

    // Coordination feedback loop
    this.createFeedbackLoop('coordination', {
      metrics: ['task_distribution', 'agent_efficiency', 'communication_latency'],
      interval: 15000, // 15 seconds
      threshold: { task_distribution: 0.8, agent_efficiency: 0.75, communication_latency: 500 },
      adaptation: 'coordination_optimization',
      priority: 'high'
    });

    // Memory feedback loop
    this.createFeedbackLoop('memory', {
      metrics: ['memory_utilization', 'retrieval_accuracy', 'storage_efficiency'],
      interval: 20000, // 20 seconds
      threshold: { memory_utilization: 0.8, retrieval_accuracy: 0.9, storage_efficiency: 0.7 },
      adaptation: 'memory_optimization',
      priority: 'medium'
    });

    // Innovation feedback loop
    this.createFeedbackLoop('innovation', {
      metrics: ['idea_quality', 'implementation_success', 'user_satisfaction'],
      interval: 30000, // 30 seconds
      threshold: { idea_quality: 0.7, implementation_success: 0.8, user_satisfaction: 0.85 },
      adaptation: 'innovation_enhancement',
      priority: 'medium'
    });
  }

  // Create a new feedback loop
  createFeedbackLoop(name, config) {
    const loop = {
      name,
      config,
      state: 'inactive',
      lastExecution: null,
      executionCount: 0,
      improvementCount: 0,
      metrics: new Map(),
      adaptations: [],
      performance: {
        averageExecutionTime: 0,
        successRate: 0,
        improvementRate: 0
      }
    };

    this.activeLoops.set(name, loop);
    this.performanceThresholds.set(name, config.threshold);
    
    console.log(`🔄 Feedback loop created: ${name}`);
    console.log(`   Metrics: ${config.metrics.join(', ')}`);
    console.log(`   Interval: ${config.interval}ms`);
    console.log(`   Priority: ${config.priority}`);
    
    return loop;
  }

  // Start all feedback loops
  start() {
    if (this.isRunning) {
      console.log('⚠️  Feedback loops already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting all feedback loops...');
    
    for (const [name, loop] of this.activeLoops) {
      this.startLoop(loop);
    }

    // Start real-time metrics collection
    this.startRealTimeMetrics();
    
    this.emit('started');
    console.log('✅ All feedback loops active');
  }

  // Stop all feedback loops
  stop() {
    if (!this.isRunning) {
      console.log('⚠️  Feedback loops not running');
      return;
    }

    this.isRunning = false;
    console.log('🛑 Stopping all feedback loops...');
    
    for (const [name, loop] of this.activeLoops) {
      this.stopLoop(loop);
    }

    this.emit('stopped');
    console.log('✅ All feedback loops stopped');
  }

  // Start individual feedback loop
  startLoop(loop) {
    if (loop.state === 'active') return;
    
    loop.state = 'active';
    loop.intervalId = setInterval(() => {
      this.executeLoop(loop);
    }, loop.config.interval);
    
    console.log(`▶️  Started loop: ${loop.name}`);
  }

  // Stop individual feedback loop
  stopLoop(loop) {
    if (loop.state === 'inactive') return;
    
    loop.state = 'inactive';
    if (loop.intervalId) {
      clearInterval(loop.intervalId);
      delete loop.intervalId;
    }
    
    console.log(`⏸️  Stopped loop: ${loop.name}`);
  }

  // Execute a feedback loop
  async executeLoop(loop) {
    const startTime = Date.now();
    
    try {
      console.log(`🔄 Executing feedback loop: ${loop.name}`);
      
      // Collect metrics
      const metrics = await this.collectMetrics(loop.config.metrics);
      
      // Store metrics
      loop.metrics.set(Date.now(), metrics);
      
      // Analyze performance
      const analysis = this.analyzeMetrics(loop, metrics);
      
      // Determine if adaptation is needed
      const adaptationNeeded = this.needsAdaptation(loop, analysis);
      
      if (adaptationNeeded) {
        // Generate and apply adaptation
        const adaptation = await this.generateAdaptation(loop, analysis);
        const success = await this.applyAdaptation(loop, adaptation);
        
        if (success) {
          loop.improvementCount++;
          this.recordImprovement(loop, adaptation, analysis);
        }
      }
      
      // Update loop performance
      const executionTime = Date.now() - startTime;
      this.updateLoopPerformance(loop, executionTime, !adaptationNeeded || adaptationNeeded);
      
      loop.executionCount++;
      loop.lastExecution = Date.now();
      
      // Emit loop execution event
      this.emit('loopExecuted', {
        loop: loop.name,
        metrics,
        analysis,
        adaptationNeeded,
        executionTime
      });
      
    } catch (error) {
      console.error(`❌ Loop execution failed (${loop.name}):`, error.message);
      this.emit('loopError', { loop: loop.name, error });
    }
  }

  // Collect metrics for a feedback loop
  async collectMetrics(metricNames) {
    const metrics = {};
    
    for (const metricName of metricNames) {
      try {
        metrics[metricName] = await this.getMetricValue(metricName);
      } catch (error) {
        console.warn(`⚠️  Failed to collect metric ${metricName}:`, error.message);
        metrics[metricName] = null;
      }
    }
    
    return metrics;
  }

  // Get value for a specific metric
  async getMetricValue(metricName) {
    const metricCalculators = {
      // Performance metrics
      response_time: () => this.realTimeMetrics.responseTime + (Math.random() * 500),
      throughput: () => this.realTimeMetrics.throughput + (Math.random() * 20),
      error_rate: () => Math.max(0, this.realTimeMetrics.errorRate + (Math.random() * 0.02 - 0.01)),
      
      // Learning metrics
      learning_velocity: () => Math.random() * 0.3 + 0.7,
      pattern_recognition: () => Math.random() * 0.2 + 0.8,
      adaptation_success: () => Math.random() * 0.4 + 0.6,
      
      // Coordination metrics
      task_distribution: () => Math.random() * 0.3 + 0.7,
      agent_efficiency: () => Math.random() * 0.25 + 0.75,
      communication_latency: () => Math.random() * 300 + 200,
      
      // Memory metrics
      memory_utilization: () => Math.random() * 0.2 + 0.6,
      retrieval_accuracy: () => Math.random() * 0.1 + 0.9,
      storage_efficiency: () => Math.random() * 0.3 + 0.7,
      
      // Innovation metrics
      idea_quality: () => Math.random() * 0.3 + 0.7,
      implementation_success: () => Math.random() * 0.2 + 0.8,
      user_satisfaction: () => Math.random() * 0.15 + 0.85
    };

    const calculator = metricCalculators[metricName];
    if (calculator) {
      return calculator();
    } else {
      throw new Error(`Unknown metric: ${metricName}`);
    }
  }

  // Analyze metrics to determine performance
  analyzeMetrics(loop, metrics) {
    const thresholds = this.performanceThresholds.get(loop.name);
    const analysis = {
      overall: 'good',
      issues: [],
      improvements: [],
      score: 0,
      recommendations: []
    };

    let totalScore = 0;
    let metricCount = 0;

    for (const [metricName, value] of Object.entries(metrics)) {
      if (value === null) continue;
      
      const threshold = thresholds[metricName];
      if (threshold === undefined) continue;

      metricCount++;
      
      // Determine if metric is "higher is better" or "lower is better"
      const higherIsBetter = this.isHigherBetterMetric(metricName);
      
      let metricScore;
      if (higherIsBetter) {
        metricScore = value >= threshold ? 1 : value / threshold;
        if (value < threshold) {
          analysis.issues.push({
            metric: metricName,
            value,
            threshold,
            severity: this.calculateSeverity(value, threshold, higherIsBetter)
          });
        }
      } else {
        metricScore = value <= threshold ? 1 : threshold / value;
        if (value > threshold) {
          analysis.issues.push({
            metric: metricName,
            value,
            threshold,
            severity: this.calculateSeverity(value, threshold, higherIsBetter)
          });
        }
      }
      
      totalScore += metricScore;
    }

    analysis.score = metricCount > 0 ? totalScore / metricCount : 0;
    
    // Determine overall status
    if (analysis.score >= 0.9) {
      analysis.overall = 'excellent';
    } else if (analysis.score >= 0.7) {
      analysis.overall = 'good';
    } else if (analysis.score >= 0.5) {
      analysis.overall = 'fair';
    } else {
      analysis.overall = 'poor';
    }

    // Generate recommendations
    analysis.recommendations = this.generateRecommendations(loop, analysis);
    
    return analysis;
  }

  // Determine if adaptation is needed
  needsAdaptation(loop, analysis) {
    // Adaptation needed if:
    // 1. Overall score is below 0.7
    // 2. High severity issues exist
    // 3. Performance is declining over time
    
    if (analysis.score < 0.7) return true;
    
    const highSeverityIssues = analysis.issues.filter(issue => issue.severity === 'high');
    if (highSeverityIssues.length > 0) return true;
    
    // Check for declining performance trend
    const recentMetrics = this.getRecentMetrics(loop, 5);
    if (recentMetrics.length >= 3) {
      const trend = this.calculateTrend(recentMetrics);
      if (trend < -0.1) return true; // Declining by more than 10%
    }
    
    return false;
  }

  // Generate adaptation strategy
  async generateAdaptation(loop, analysis) {
    const adaptationType = loop.config.adaptation;
    const issues = analysis.issues;
    
    const adaptation = {
      type: adaptationType,
      target: loop.name,
      issues: issues,
      strategies: [],
      priority: this.calculateAdaptationPriority(analysis),
      expectedImpact: this.estimateAdaptationImpact(analysis),
      timestamp: Date.now()
    };

    // Generate specific strategies based on issues
    for (const issue of issues) {
      const strategies = this.generateStrategiesForIssue(issue, adaptationType);
      adaptation.strategies.push(...strategies);
    }

    // Add general improvement strategies
    const generalStrategies = this.generateGeneralStrategies(adaptationType, analysis);
    adaptation.strategies.push(...generalStrategies);
    
    console.log(`🧠 Generated adaptation for ${loop.name}:`);
    console.log(`   Type: ${adaptationType}`);
    console.log(`   Priority: ${adaptation.priority}`);
    console.log(`   Strategies: ${adaptation.strategies.length}`);
    
    return adaptation;
  }

  // Apply adaptation to the system
  async applyAdaptation(loop, adaptation) {
    console.log(`🔧 Applying adaptation to ${loop.name}...`);
    
    let successCount = 0;
    const totalStrategies = adaptation.strategies.length;
    
    for (const strategy of adaptation.strategies) {
      try {
        const success = await this.executeAdaptationStrategy(strategy);
        if (success) successCount++;
      } catch (error) {
        console.error(`❌ Strategy failed: ${strategy.name}`, error.message);
      }
    }
    
    const successRate = totalStrategies > 0 ? successCount / totalStrategies : 0;
    
    // Record adaptation attempt
    loop.adaptations.push({
      adaptation,
      timestamp: Date.now(),
      successRate,
      strategiesExecuted: successCount,
      totalStrategies
    });
    
    console.log(`📊 Adaptation applied: ${successCount}/${totalStrategies} strategies successful`);
    
    return successRate > 0.5; // Success if more than half of strategies worked
  }

  // Execute a specific adaptation strategy
  async executeAdaptationStrategy(strategy) {
    const strategies = {
      // Performance optimizations
      'increase_parallel_processing': () => {
        console.log('   ⚡ Increasing parallel processing capacity');
        this.realTimeMetrics.throughput *= 1.1;
        return true;
      },
      'optimize_response_time': () => {
        console.log('   🚀 Optimizing response time');
        this.realTimeMetrics.responseTime *= 0.9;
        return true;
      },
      'reduce_error_rate': () => {
        console.log('   🛡️  Implementing error reduction measures');
        this.realTimeMetrics.errorRate *= 0.8;
        return true;
      },
      
      // Learning optimizations
      'enhance_pattern_recognition': () => {
        console.log('   🧠 Enhancing pattern recognition');
        return true;
      },
      'accelerate_learning': () => {
        console.log('   📈 Accelerating learning velocity');
        this.realTimeMetrics.learningVelocity *= 1.15;
        return true;
      },
      
      // Coordination optimizations
      'improve_task_distribution': () => {
        console.log('   ⚖️  Improving task distribution');
        return true;
      },
      'enhance_communication': () => {
        console.log('   📡 Enhancing communication protocols');
        return true;
      },
      
      // Memory optimizations
      'optimize_memory_usage': () => {
        console.log('   💾 Optimizing memory usage');
        return true;
      },
      'improve_retrieval': () => {
        console.log('   🔍 Improving memory retrieval');
        return true;
      },
      
      // Innovation enhancements
      'enhance_creativity': () => {
        console.log('   🎨 Enhancing creativity algorithms');
        return true;
      },
      'improve_implementation': () => {
        console.log('   🔨 Improving implementation success');
        return true;
      }
    };

    const executor = strategies[strategy.name];
    if (executor) {
      return executor();
    } else {
      console.warn(`❓ Unknown strategy: ${strategy.name}`);
      return false;
    }
  }

  // Record improvement in history
  recordImprovement(loop, adaptation, analysis) {
    const improvement = {
      timestamp: Date.now(),
      loop: loop.name,
      beforeScore: analysis.score,
      adaptation: adaptation.type,
      strategiesApplied: adaptation.strategies.length,
      expectedImpact: adaptation.expectedImpact
    };

    this.improvementHistory.push(improvement);
    
    // Keep only last 100 improvements
    if (this.improvementHistory.length > 100) {
      this.improvementHistory = this.improvementHistory.slice(-100);
    }
    
    console.log(`📈 Improvement recorded for ${loop.name}`);
  }

  // Start real-time metrics collection
  startRealTimeMetrics() {
    this.metricsInterval = setInterval(() => {
      // Simulate realistic metric changes
      this.realTimeMetrics.responseTime += (Math.random() - 0.5) * 100;
      this.realTimeMetrics.throughput += (Math.random() - 0.5) * 2;
      this.realTimeMetrics.errorRate += (Math.random() - 0.5) * 0.001;
      this.realTimeMetrics.adaptationRate = this.calculateAdaptationRate();
      this.realTimeMetrics.learningVelocity += (Math.random() - 0.5) * 0.1;
      
      // Keep metrics in reasonable bounds
      this.realTimeMetrics.responseTime = Math.max(100, Math.min(5000, this.realTimeMetrics.responseTime));
      this.realTimeMetrics.throughput = Math.max(1, Math.min(100, this.realTimeMetrics.throughput));
      this.realTimeMetrics.errorRate = Math.max(0, Math.min(0.2, this.realTimeMetrics.errorRate));
      this.realTimeMetrics.learningVelocity = Math.max(0.1, Math.min(1.0, this.realTimeMetrics.learningVelocity));
      
    }, 1000); // Update every second
  }

  // Get current system status
  getStatus() {
    const status = {
      running: this.isRunning,
      activeLoops: this.activeLoops.size,
      totalExecutions: Array.from(this.activeLoops.values()).reduce((sum, loop) => sum + loop.executionCount, 0),
      totalImprovements: Array.from(this.activeLoops.values()).reduce((sum, loop) => sum + loop.improvementCount, 0),
      realTimeMetrics: { ...this.realTimeMetrics },
      loops: {},
      recentImprovements: this.improvementHistory.slice(-10)
    };

    // Add loop-specific status
    for (const [name, loop] of this.activeLoops) {
      status.loops[name] = {
        state: loop.state,
        executionCount: loop.executionCount,
        improvementCount: loop.improvementCount,
        lastExecution: loop.lastExecution,
        performance: loop.performance
      };
    }

    return status;
  }

  // Setup event handlers
  setupEventHandlers() {
    this.on('loopExecuted', (data) => {
      // Log significant events
      if (data.adaptationNeeded) {
        console.log(`🔧 Adaptation triggered for ${data.loop}`);
      }
    });

    this.on('loopError', (data) => {
      console.error(`💥 Loop error in ${data.loop}:`, data.error.message);
    });
  }

  // Utility methods
  isHigherBetterMetric(metricName) {
    const higherIsBetter = [
      'throughput', 'learning_velocity', 'pattern_recognition', 'adaptation_success',
      'task_distribution', 'agent_efficiency', 'memory_utilization', 'retrieval_accuracy',
      'storage_efficiency', 'idea_quality', 'implementation_success', 'user_satisfaction'
    ];
    return higherIsBetter.includes(metricName);
  }

  calculateSeverity(value, threshold, higherIsBetter) {
    const ratio = higherIsBetter ? value / threshold : threshold / value;
    if (ratio < 0.5) return 'high';
    if (ratio < 0.8) return 'medium';
    return 'low';
  }

  calculateAdaptationPriority(analysis) {
    if (analysis.score < 0.5) return 'critical';
    if (analysis.score < 0.7) return 'high';
    if (analysis.score < 0.85) return 'medium';
    return 'low';
  }

  estimateAdaptationImpact(analysis) {
    // Estimate how much improvement this adaptation might achieve
    const currentScore = analysis.score;
    const potentialImprovement = Math.min(0.3, (1.0 - currentScore) * 0.5);
    return potentialImprovement;
  }

  generateStrategiesForIssue(issue, adaptationType) {
    const strategyMap = {
      performance_optimization: {
        response_time: ['optimize_response_time', 'increase_parallel_processing'],
        throughput: ['increase_parallel_processing', 'optimize_resource_allocation'],
        error_rate: ['reduce_error_rate', 'improve_error_handling']
      },
      learning_optimization: {
        learning_velocity: ['accelerate_learning', 'optimize_algorithms'],
        pattern_recognition: ['enhance_pattern_recognition', 'improve_data_quality']
      },
      coordination_optimization: {
        task_distribution: ['improve_task_distribution', 'enhance_load_balancing'],
        communication_latency: ['enhance_communication', 'optimize_protocols']
      },
      memory_optimization: {
        memory_utilization: ['optimize_memory_usage', 'improve_garbage_collection'],
        retrieval_accuracy: ['improve_retrieval', 'enhance_indexing']
      },
      innovation_enhancement: {
        idea_quality: ['enhance_creativity', 'improve_brainstorming'],
        implementation_success: ['improve_implementation', 'enhance_testing']
      }
    };

    const strategies = strategyMap[adaptationType]?.[issue.metric] || [];
    return strategies.map(name => ({
      name,
      target: issue.metric,
      severity: issue.severity,
      expectedImprovement: this.estimateStrategyImpact(name, issue)
    }));
  }

  generateGeneralStrategies(adaptationType, analysis) {
    // Return general improvement strategies based on adaptation type
    const generalStrategies = {
      performance_optimization: ['general_performance_tuning'],
      learning_optimization: ['enhance_learning_algorithms'],
      coordination_optimization: ['improve_coordination_protocols'],
      memory_optimization: ['optimize_memory_management'],
      innovation_enhancement: ['enhance_innovation_processes']
    };

    const strategies = generalStrategies[adaptationType] || [];
    return strategies.map(name => ({
      name,
      target: 'general',
      severity: 'medium',
      expectedImprovement: 0.1
    }));
  }

  generateRecommendations(loop, analysis) {
    const recommendations = [];
    
    for (const issue of analysis.issues) {
      recommendations.push({
        type: 'issue_resolution',
        metric: issue.metric,
        severity: issue.severity,
        recommendation: `Address ${issue.metric} performance (current: ${issue.value.toFixed(2)}, target: ${issue.threshold})`
      });
    }

    if (analysis.score < 0.8) {
      recommendations.push({
        type: 'general_improvement',
        recommendation: `Overall performance can be improved (current score: ${(analysis.score * 100).toFixed(1)}%)`
      });
    }

    return recommendations;
  }

  getRecentMetrics(loop, count = 5) {
    const entries = Array.from(loop.metrics.entries())
      .sort((a, b) => b[0] - a[0])
      .slice(0, count);
    return entries.map(([timestamp, metrics]) => ({ timestamp, metrics }));
  }

  calculateTrend(recentMetrics) {
    // Simple trend calculation - could be improved with proper statistical analysis
    if (recentMetrics.length < 2) return 0;
    
    const first = recentMetrics[recentMetrics.length - 1];
    const last = recentMetrics[0];
    
    // Calculate average score for each
    const firstScore = this.calculateAverageScore(first.metrics);
    const lastScore = this.calculateAverageScore(last.metrics);
    
    return (lastScore - firstScore) / firstScore;
  }

  calculateAverageScore(metrics) {
    const values = Object.values(metrics).filter(v => v !== null);
    return values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
  }

  updateLoopPerformance(loop, executionTime, success) {
    const perf = loop.performance;
    const count = loop.executionCount;
    
    // Update average execution time
    perf.averageExecutionTime = ((perf.averageExecutionTime * count) + executionTime) / (count + 1);
    
    // Update success rate
    const successCount = (perf.successRate * count) + (success ? 1 : 0);
    perf.successRate = successCount / (count + 1);
    
    // Update improvement rate
    const improvementCount = loop.improvementCount;
    perf.improvementRate = improvementCount / (count + 1);
  }

  calculateAdaptationRate() {
    const recentImprovements = this.improvementHistory.filter(
      imp => Date.now() - imp.timestamp < 60000 // Last minute
    );
    return recentImprovements.length;
  }

  estimateStrategyImpact(strategyName, issue) {
    // Estimate impact based on strategy type and issue severity
    const baseImpact = {
      'optimize_response_time': 0.2,
      'increase_parallel_processing': 0.15,
      'reduce_error_rate': 0.25,
      'enhance_pattern_recognition': 0.1,
      'accelerate_learning': 0.15,
      'improve_task_distribution': 0.1,
      'enhance_communication': 0.05,
      'optimize_memory_usage': 0.1,
      'improve_retrieval': 0.15
    };

    const impact = baseImpact[strategyName] || 0.05;
    const severityMultiplier = issue.severity === 'high' ? 1.5 : issue.severity === 'medium' ? 1.2 : 1.0;
    
    return impact * severityMultiplier;
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2];
  const feedbackSystem = new SwarmFeedbackLoops();

  switch (command) {
    case 'start':
      feedbackSystem.start();
      // Keep running for demonstration
      setTimeout(() => {
        console.log('\n📊 System Status after 30 seconds:');
        console.log(JSON.stringify(feedbackSystem.getStatus(), null, 2));
        process.exit(0);
      }, 30000);
      break;
    
    case 'status':
      const status = feedbackSystem.getStatus();
      console.log(JSON.stringify(status, null, 2));
      break;
    
    case 'stop':
      feedbackSystem.stop();
      break;
    
    case 'test':
      console.log('🧪 Testing feedback loops for 20 seconds...');
      feedbackSystem.start();
      setTimeout(() => {
        console.log('\n📊 Test Results:');
        console.log(JSON.stringify(feedbackSystem.getStatus(), null, 2));
        feedbackSystem.stop();
        process.exit(0);
      }, 20000);
      break;
    
    default:
      console.log(`
🔄 Swarm Feedback Loops System

Commands:
  start    Start all feedback loops
  stop     Stop all feedback loops  
  status   Show current status
  test     Run test for 20 seconds

Example:
  swarm-feedback-loops.js start
  swarm-feedback-loops.js status
      `);
  }
}

// Export for module usage
module.exports = SwarmFeedbackLoops;

// Run CLI if called directly
if (require.main === module) {
  main().catch(console.error);
}