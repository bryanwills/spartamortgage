'use client';

import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import {
  DollarSign,
  Percent,
  TrendingUp,
  Calendar,
  PlusCircle,
} from 'lucide-react'

interface ChartDataPoint {
  year: number
  standardBalance: number
  standardInterest: number
  extraBalance?: number
  extraInterest?: number
}

interface ExtraPaymentResults {
  monthsPaid: number
  yearsPaid: number
  totalInterest: number
  interestSaved: number
  timeSavedMonths: number
  timeSavedYears: number
  timeSavedRemainingMonths: number
}

interface Results {
  monthlyPayment: number
  totalInterest: number
  totalAmount: number
  downPaymentAmount: number
  extraPaymentResults: ExtraPaymentResults | null
  chartData: ChartDataPoint[]
}

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: 300000,
    downPayment: 20,
    interestRate: 6.0,
    loanTerm: 30,
    creditScore: 'excellent',
    extraPayment: 0,
  })

  const [results, setResults] = useState<Results>({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    downPaymentAmount: 0,
    extraPaymentResults: null,
    chartData: [],
  })

  const creditScoreRanges = [
    { value: 'excellent', label: 'Excellent (750+)', rate: 6.0 },
    { value: 'good', label: 'Good (700-749)', rate: 6.5 },
    { value: 'fair', label: 'Fair (650-699)', rate: 7.0 },
    { value: 'poor', label: 'Poor (600-649)', rate: 8.0 },
  ]

  const loanTermOptions = [10, 15, 20, 25, 30]

  const calculateMortgage = () => {
    const principal =
      formData.homePrice - (formData.homePrice * formData.downPayment) / 100
    const monthlyRate = formData.interestRate / 100 / 12
    const numberOfPayments = formData.loanTerm * 12

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalAmount = monthlyPayment * numberOfPayments
    const totalInterest = totalAmount - principal
    const downPaymentAmount = (formData.homePrice * formData.downPayment) / 100

    // Calculate amortization schedule for chart
    let balance = principal
    const chartData: ChartDataPoint[] = []
    let totalInterestPaid = 0

    // Standard loan calculations
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      totalInterestPaid += interestPayment

      if (month % 12 === 0 || month === numberOfPayments) {
        // Show yearly data points
        chartData.push({
          year: Math.ceil(month / 12),
          standardBalance: Math.max(0, balance),
          standardInterest: totalInterestPaid,
        })
      }
    }

    // Extra payment calculations
    let extraPaymentResults: ExtraPaymentResults | null = null
    if (formData.extraPayment > 0) {
      let extraBalance = principal
      let extraTotalInterest = 0
      let extraMonthsPaid = 0

      for (let month = 1; month <= numberOfPayments; month++) {
        if (extraBalance <= 0) break

        const interestPayment = extraBalance * monthlyRate
        const principalPayment = monthlyPayment - interestPayment
        const totalPayment = principalPayment + formData.extraPayment

        extraBalance -= totalPayment
        extraTotalInterest += interestPayment
        extraMonthsPaid = month

        if (month % 12 === 0 || extraBalance <= 0) {
          const yearIndex = chartData.findIndex(
            item => item.year === Math.ceil(month / 12)
          )
          if (yearIndex !== -1) {
            chartData[yearIndex].extraBalance = Math.max(0, extraBalance)
            chartData[yearIndex].extraInterest = extraTotalInterest
          }
        }

        if (extraBalance <= 0) break
      }

      const interestSaved = totalInterest - extraTotalInterest
      const timeSaved = numberOfPayments - extraMonthsPaid

      extraPaymentResults = {
        monthsPaid: extraMonthsPaid,
        yearsPaid: Math.ceil(extraMonthsPaid / 12),
        totalInterest: extraTotalInterest,
        interestSaved: interestSaved,
        timeSavedMonths: timeSaved,
        timeSavedYears: Math.floor(timeSaved / 12),
        timeSavedRemainingMonths: timeSaved % 12,
      }
    }

    setResults({
      monthlyPayment: monthlyPayment || 0,
      totalInterest: totalInterest || 0,
      totalAmount: totalAmount || 0,
      downPaymentAmount,
      extraPaymentResults,
      chartData,
    })
  }

  useEffect(() => {
    calculateMortgage()
  }, [formData])

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreditScoreChange = (creditScore: string) => {
    const selectedScore = creditScoreRanges.find(
      score => score.value === creditScore
    )
    setFormData(prev => ({
      ...prev,
      creditScore,
      interestRate: selectedScore?.rate || 6.0,
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div
      className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl"
      suppressHydrationWarning
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-white">Loan Details</h3>

            {/* Home Price */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <DollarSign className="w-4 h-4 text-yellow-300" />
                Home Price
              </label>
              <input
                type="number"
                value={formData.homePrice}
                onChange={e =>
                  handleInputChange(
                    'homePrice',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="300,000"
                suppressHydrationWarning
              />
            </div>

            {/* Down Payment */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <Percent className="w-4 h-4 text-yellow-300" />
                Down Payment (%)
              </label>
              <input
                type="number"
                value={formData.downPayment}
                onChange={e =>
                  handleInputChange(
                    'downPayment',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="20"
                min="0"
                max="100"
                suppressHydrationWarning
              />
              <p className="text-sm text-white/70 mt-1">
                Amount: {formatCurrency(results.downPaymentAmount)}
              </p>
            </div>

            {/* Interest Rate */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <TrendingUp className="w-4 h-4 text-yellow-300" />
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.interestRate}
                onChange={e =>
                  handleInputChange(
                    'interestRate',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="6.5"
                suppressHydrationWarning
              />
            </div>

            {/* Loan Term */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <Calendar className="w-4 h-4 text-yellow-300" />
                Loan Term (Years)
              </label>
              <select
                value={formData.loanTerm}
                onChange={e =>
                  handleInputChange('loanTerm', parseInt(e.target.value))
                }
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                suppressHydrationWarning
              >
                {loanTermOptions.map(term => (
                  <option key={term} value={term}>
                    {term} years
                  </option>
                ))}
              </select>
            </div>

            {/* Credit Score */}
            <div className="mb-4">
              <label className="text-sm font-medium text-white/90 mb-2 block">
                Credit Score Range
              </label>
              <select
                value={formData.creditScore}
                onChange={e => handleCreditScoreChange(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                suppressHydrationWarning
              >
                {creditScoreRanges.map(score => (
                  <option key={score.value} value={score.value}>
                    {score.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Extra Payment */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <PlusCircle className="w-4 h-4 text-yellow-300" />
                Extra Monthly Payment (Optional)
              </label>
              <input
                type="number"
                value={formData.extraPayment || ''}
                onChange={e =>
                  handleInputChange(
                    'extraPayment',
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                placeholder="0"
                min="0"
                suppressHydrationWarning
              />
              <p className="text-sm text-white/70 mt-1">
                Additional amount paid toward principal each month
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Monthly Payment
            </h3>
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <p className="text-white/90">Principal & Interest</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Loan Amount</h4>
              <p className="text-2xl font-bold text-yellow-300">
                {formatCurrency(formData.homePrice - results.downPaymentAmount)}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Total Interest</h4>
              <p className="text-2xl font-bold text-yellow-300">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">
                Total Amount Paid
              </h4>
              <p className="text-2xl font-bold text-yellow-300">
                {formatCurrency(results.totalAmount)}
              </p>
            </div>

            {results.extraPaymentResults && (
              <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 border-l-4 border-green-400">
                <h4 className="font-semibold text-green-300 mb-3">
                  Extra Payment Benefits
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/90">Interest Saved:</span>
                    <span className="font-bold text-green-300">
                      {formatCurrency(
                        results.extraPaymentResults.interestSaved
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Time Saved:</span>
                    <span className="font-bold text-green-300">
                      {results.extraPaymentResults.timeSavedYears} years,{' '}
                      {results.extraPaymentResults.timeSavedRemainingMonths}{' '}
                      months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">New Loan Term:</span>
                    <span className="font-bold text-green-300">
                      {results.extraPaymentResults.yearsPaid} years
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-500/20 backdrop-blur-md rounded-xl p-4 border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> This calculator provides estimates only.
              Actual payments may vary based on taxes, insurance, and other
              factors.
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {results.chartData.length > 0 && (
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-8 pb-20 shadow-sm border border-white/20">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Loan Balance Over Time
          </h3>
          <div className="h-[28rem] relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.2)"
                />
                <XAxis
                  dataKey="year"
                  stroke="#1f2937"
                  tick={{ fill: '#1f2937' }}
                />
                <YAxis
                  tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                  stroke="#1f2937"
                  tick={{ fill: '#1f2937' }}
                />
                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(value as number),
                    name,
                  ]}
                  labelFormatter={year => `Year ${year}`}
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="standardBalance"
                  stroke="#fbbf24"
                  strokeWidth={3}
                  dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
                />
                {formData.extraPayment > 0 && (
                  <Line
                    type="monotone"
                    dataKey="extraBalance"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>

            {/* Custom centered legend with Years label - positioned halfway between previous positions */}
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              {/* Years label */}
              <div className="text-sm font-medium text-gray-700 mb-3 mt-5">
                Years
              </div>

              {/* Legend items */}
              <div className="flex justify-center items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-white">Standard Payment</span>
                </div>
                {formData.extraPayment > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-white">
                      With ${formData.extraPayment} Extra
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {formData.extraPayment > 0 && results.extraPaymentResults && (
            <div className="mt-20 p-4 bg-green-500/20 backdrop-blur-md rounded-xl">
              <h4 className="font-semibold text-green-300 mb-2 text-center">
                Impact of ${formData.extraPayment} Extra Monthly Payment:
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">
                    {formatCurrency(results.extraPaymentResults.interestSaved)}
                  </div>
                  <div className="text-white/90">Interest Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">
                    {results.extraPaymentResults.timeSavedYears}.
                    {results.extraPaymentResults.timeSavedRemainingMonths}
                  </div>
                  <div className="text-white/90">Years Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">
                    {results.extraPaymentResults.yearsPaid}
                  </div>
                  <div className="text-white/90">New Loan Term (Years)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MortgageCalculator;
