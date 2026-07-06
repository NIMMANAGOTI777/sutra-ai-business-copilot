import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useApp } from '../context/AppContext';
import EmptyState from './EmptyState';
import { TrendingUp, Users, Clock, Smile, Filter } from 'lucide-react';

export default function AnalyticsView() {
  const { activeBusinessData, setActiveTab } = useApp();
  const [timeframe, setTimeframe] = useState('week'); // today, week, month, year

  const metricsData = activeBusinessData.analytics;

  // Simulate slightly different metrics based on timeframe filter
  const getMultiplier = () => {
    switch (timeframe) {
      case 'today': return 0.15;
      case 'month': return 4.3;
      case 'year': return 52;
      default: return 1.0;
    }
  };

  const multiplier = getMultiplier();
  const scaledRevenue = metricsData.revenue.map(r => Math.round(r * multiplier));
  const scaledLeads = metricsData.leads.map(l => Math.round(l * multiplier));
  const scaledConversions = metricsData.conversions.map(c => Math.round(c * multiplier));

  // Common ECharts options setup
  const baseTextStyle = {
    fontFamily: 'Inter, sans-serif',
    color: '#94a3b8'
  };

  // Chart 1: Revenue vs Leads Trend (Dual Y-Axis Line/Bar Chart)
  const revenueLeadsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0d0d12',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      textStyle: { color: '#f8fafc' },
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Revenue', 'Leads'],
      textStyle: { color: '#f8fafc' },
      top: '0%'
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '5%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: metricsData.timeline,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        axisLabel: { color: '#94a3b8' }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Revenue (₹)',
        nameTextStyle: { color: '#94a3b8' },
        axisLabel: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.04)' } }
      },
      {
        type: 'value',
        name: 'Leads Enquiries',
        nameTextStyle: { color: '#94a3b8' },
        axisLabel: { color: '#94a3b8' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: '35%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#6C4CF1' },
              { offset: 1, color: '#4F8EF7' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        data: scaledRevenue
      },
      {
        name: 'Leads',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: '#10B981' },
        lineStyle: { width: 3, shadowBlur: 10, shadowColor: 'rgba(16, 185, 129, 0.3)' },
        data: scaledLeads
      }
    ]
  };

  // Chart 2: Response Time & Customer Satisfaction (Dual Axis Line Chart)
  const responseCsatOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0d0d12',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      textStyle: { color: '#f8fafc' }
    },
    legend: {
      data: ['Response Time (min)', 'CSAT Score (out of 5.0)'],
      textStyle: { color: '#f8fafc' },
      top: '0%'
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '5%',
      top: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: metricsData.timeline,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        axisLabel: { color: '#94a3b8' }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Response Time (mins)',
        nameTextStyle: { color: '#94a3b8' },
        axisLabel: { color: '#94a3b8' },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.04)' } }
      },
      {
        type: 'value',
        name: 'CSAT Score',
        nameTextStyle: { color: '#94a3b8' },
        min: 4,
        max: 5,
        axisLabel: { color: '#94a3b8' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Response Time (min)',
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbolSize: 6,
        itemStyle: { color: '#EF4444' },
        lineStyle: { width: 3 },
        data: metricsData.responseTime
      },
      {
        name: 'CSAT Score (out of 5.0)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 6,
        itemStyle: { color: '#F59E0B' },
        lineStyle: { width: 3 },
        data: metricsData.satisfaction
      }
    ]
  };

  // Chart 3: Top Products / Revenue Contribution (Pie Chart)
  const productPieOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0d0d12',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      textStyle: { color: '#f8fafc' },
      formatter: '{b}: <b>{c}%</b> of sales'
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'middle',
      textStyle: { color: '#f8fafc' }
    },
    series: [
      {
        name: 'Revenue Share',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0d0d11',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            formatter: '{b}\n{c}%'
          }
        },
        labelLine: {
          show: false
        },
        data: metricsData.topProducts.map(p => ({
          name: p.name,
          value: p.percentage
        }))
      }
    ]
  };

  if (metricsData.topProducts.length === 0) {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', width: '100%' }}>
        <EmptyState
          title="No Analytics Data Yet"
          description="Sync customer transaction pipelines and checkout platforms (like Stripe or Shopify) to track revenue metrics."
          icon={TrendingUp}
          tip="Configure automations to trace abandoned carts and conversions."
          actionText="Configure Integrations"
          onAction={() => setActiveTab('integrations')}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top filter row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Business Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Detailed charts for revenue performance, customer responses, and products.</p>
        </div>

        {/* Date Filter Segmented Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          padding: '4px',
          borderRadius: '10px'
        }}>
          {['today', 'week', 'month', 'year'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                fontSize: '0.75rem',
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: timeframe === t ? 'var(--color-purple)' : 'transparent',
                color: timeframe === t ? 'white' : 'var(--text-secondary)',
                fontWeight: timeframe === t ? 600 : 500,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.15s'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid containing large charts - Strict 1 chart per row for LINE / MIXED layout for high readability */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Chart Card 1: Revenue vs Leads */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyBetween: 'true', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Revenue Growth & Lead Volume</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Comparison of total sales income and incoming lead volume.
              </p>
            </div>
          </div>
          <div style={{ height: '350px', width: '100%', marginTop: '1rem' }}>
            <ReactECharts 
              option={revenueLeadsOption} 
              style={{ height: '100%', width: '100%' }}
              theme={window.document.documentElement.classList.contains('dark') ? 'dark' : ''}
            />
          </div>
        </div>

        {/* 2-Column Grid for supporting metrics: Product distribution and Service levels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Chart Card 2: Top Products */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Revenue Share by Category</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Percentage distribution of sales revenues.
              </p>
            </div>
            <div style={{ height: '280px', width: '100%', marginTop: '1rem' }}>
              <ReactECharts 
                option={productPieOption} 
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          </div>

          {/* Chart Card 3: Response time & CSAT */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Service Quality & Satisfaction</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Correlating customer satisfaction ratings with lead response time.
              </p>
            </div>
            <div style={{ height: '280px', width: '100%', marginTop: '1rem' }}>
              <ReactECharts 
                option={responseCsatOption} 
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
