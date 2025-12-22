import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setYear, setSuccess } from '../../features/launches/launches.slice';
import { fetchLaunches } from '../../features/launches/launches.thunks';

export default function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((s) => s.launches.filters);

    const years = Array.from({ length: 19 }, (_, i) => 2006 + i); // 2006..2024

    function apply() {
        dispatch(fetchLaunches());
    }

    return (
        <div className="flex gap-4 items-end">
            <div>
                <label className="block text-sm text-gray-700">Year</label>
                <select
                    data-testid="year-select"
                    value={filters.year ?? ''}
                    onChange={(e) => dispatch(setYear(e.target.value))}
                    className="border p-2 rounded"
                >
                    <option value="">Todos</option>
                    {years.map((y) => (
                        <option key={y} value={String(y)}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm text-gray-700">Success</label>
                <select
                    data-testid="success-select"
                    value={filters.success === null ? '' : filters.success ? 'true' : 'false'}
                    onChange={(e) =>
                        dispatch(setSuccess(e.target.value === '' ? null : e.target.value === 'true'))
                    }
                    className="border p-2 rounded"
                >
                    <option value="">Todos</option>
                    <option value="true">Success</option>
                    <option value="false">Failure</option>
                </select>
            </div>

            <button onClick={apply} className="bg-blue-600 text-white px-4 py-2 rounded" data-testid="apply-btn">
                Apply
            </button>
        </div>
    );
}

