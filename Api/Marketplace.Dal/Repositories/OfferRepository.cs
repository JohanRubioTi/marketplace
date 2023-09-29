public async Task<IEnumerable<Offer>> GetOffersByPageAsync(int pageNumber, int pageSize)
{
    // Calculate the skip count based on the page number and page size
    int skipCount = (pageNumber - 1) * pageSize;
    
    return await dbContext.Offers
        .OrderBy(o => o.Id) // Order by a suitable column, e.g., Id
        .Skip(skipCount)
        .Take(pageSize)
        .ToListAsync();
}

public async Task<int> GetTotalOfferCountAsync()
{
    return await dbContext.Offers.CountAsync();
}
