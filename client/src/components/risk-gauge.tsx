interface RiskGaugeProps {
  riskPercentage: number;
  riskCategory: string;
}

export default function RiskGauge({ riskPercentage, riskCategory }: RiskGaugeProps) {
  return (
    <div className="bg-neutral-100 rounded-lg p-6">
      <div className="flex justify-between text-sm text-neutral-600 mb-2">
        <span>Low Risk</span>
        <span>Moderate Risk</span>
        <span>High Risk</span>
      </div>
      <div className="h-4 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full relative">
        <div 
          className="h-6 w-6 bg-white border-4 border-primary rounded-full absolute -top-1 transition-all duration-1000 ease-out"
          style={{ marginLeft: `${riskPercentage}%` }}
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-2xl font-bold text-primary">{riskPercentage.toFixed(0)}%</span>
        <p className="text-neutral-600">{riskCategory}</p>
      </div>
    </div>
  );
}
