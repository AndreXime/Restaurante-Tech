'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { reservations } from '@/fake-data/reservations';

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
];

export function ReservationCalendar() {
	const [currentDate, setCurrentDate] = useState(new Date());

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay();
	};

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);

	const prevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const nextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	const getReservationsForDate = (day: number) => {
		const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return reservations.filter((r) => r.date === dateStr);
	};

	const renderCalendarDays = () => {
		const days = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className="h-24 border bg-gray-50"></div>
			);
		}

		// Add cells for each day of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const dayReservations = getReservationsForDate(day);
			days.push(
				<div
					key={day}
					className="h-24 border p-1 hover:bg-gray-50 cursor-pointer">
					<div className="font-medium">{day}</div>
					{dayReservations.length > 0 && (
						<div className="mt-1">
							{dayReservations.slice(0, 2).map((res, idx) => (
								<div
									key={idx}
									className="text-xs bg-green-100 text-green-800 rounded px-1 py-0.5 mb-0.5 truncate">
									{res.time} - {res.name}
								</div>
							))}
							{dayReservations.length > 2 && (
								<div className="text-xs text-gray-500">+{dayReservations.length - 2} mais</div>
							)}
						</div>
					)}
				</div>
			);
		}

		return days;
	};

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex justify-between items-center mb-4">
					<Button
						variant="outline"
						size="icon"
						onClick={prevMonth}>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<h2 className="text-xl font-bold">
						{months[month]} {year}
					</h2>
					<Button
						variant="outline"
						size="icon"
						onClick={nextMonth}>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="grid grid-cols-7 gap-1">
					{weekDays.map((day) => (
						<div
							key={day}
							className="text-center font-medium py-2 bg-gray-100">
							{day}
						</div>
					))}
					{renderCalendarDays()}
				</div>
			</CardContent>
		</Card>
	);
}
