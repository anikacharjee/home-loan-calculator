        const loanAmountInput = document.getElementById('loanAmount');
        const loanAmountSlider = document.getElementById('loanAmountSlider');
        const loanTenureInput = document.getElementById('loanTenure');
        const loanTenureSlider = document.getElementById('loanTenureSlider');
        const interestRateInput = document.getElementById('interestRate');
        const interestRateSlider = document.getElementById('interestRateSlider');
        const monthlyEMIOutput = document.getElementById('monthlyEMI');
        const emiChartCanvas = document.getElementById('emiChart');

        let emiChart; 

       
        function calculateEMI(P, R, N) {
            if (R === 0) { 
                return P / N;
            }
            const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
            return isFinite(emi) ? emi : 0; 
        }

        
        function updateEMI() {
            const P = parseFloat(loanAmountInput.value);
            const tenureYears = parseFloat(loanTenureInput.value);
            const annualInterestRate = parseFloat(interestRateInput.value);

            const R = annualInterestRate / (12 * 100); 
            const N = tenureYears * 12; 

            const emi = calculateEMI(P, R, N);
            const totalPayableAmount = emi * N;
            const totalInterestPayable = totalPayableAmount - P;

            monthlyEMIOutput.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;

            updateChart(P, totalInterestPayable);
        }

        function updateChart(principal, interest) {
            const data = {
                labels: ['Principal Amount', 'Total Interest Payable'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#2563eb', '#93c5fd'], 
                    hoverOffset: 4
                }]
            };

            const config = {
                type: 'doughnut', 
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: {
                        legend: {
                            display: false 
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += `₹ ${context.parsed.toLocaleString('en-IN')}`;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };

            if (emiChart) {
                emiChart.data = data;
                emiChart.update();
            } else {
                emiChart = new Chart(emiChartCanvas, config);
            }
        }

        

        
        loanAmountInput.addEventListener('input', () => {
            loanAmountSlider.value = loanAmountInput.value;
            updateEMI();
        });
        loanAmountSlider.addEventListener('input', () => {
            loanAmountInput.value = loanAmountSlider.value;
            updateEMI();
        });

        
        loanTenureInput.addEventListener('input', () => {
            loanTenureSlider.value = loanTenureInput.value;
            updateEMI();
        });
        loanTenureSlider.addEventListener('input', () => {
            loanTenureInput.value = loanTenureSlider.value;
            updateEMI();
        });

        
        interestRateInput.addEventListener('input', () => {
            interestRateSlider.value = interestRateInput.value;
            updateEMI();
        });
        interestRateSlider.addEventListener('input', () => {
            interestRateInput.value = interestRateSlider.value;
            updateEMI();
        });

        
        document.addEventListener('DOMContentLoaded', updateEMI);