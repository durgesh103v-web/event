const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildDateFilter = (dateFilter) => {
  if (!dateFilter) return {};

  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));

  if (dateFilter === 'today') {
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);
    return { startsAt: { $gte: startOfDay, $lte: endOfDay } };
  }

  const dayRanges = { week: 7, month: 30 };
  if (dayRanges[dateFilter]) {
    const endDate = dateFilter === 'week' ? new Date() : new Date(startOfDay);
    endDate.setDate(startOfDay.getDate() + dayRanges[dateFilter]);
    return { startsAt: { $gte: startOfDay, $lte: endDate } };
  }

  if (dateFilter === 'online') {
    return { location: { $regex: '^Online$', $options: 'i' } };
  }

  return {};
};

export const buildEventFilter = (query) => {
  const filter = {};
  const search = (query.search || '').trim();

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  if (query.category) filter.category = query.category;

  if (query.location) {
    filter.location = { $regex: escapeRegex(query.location), $options: 'i' };
  }

  return { ...filter, ...buildDateFilter(query.date) };
};
