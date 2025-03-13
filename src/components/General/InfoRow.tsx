export const InfoRow = ({label, value}: { label: string; value: string }) => (
    <div className="flex items-center gap-3">
        <p className="text-lg">{label}</p>
        <p className="text-lg font-bold">{value}</p>
    </div>
);