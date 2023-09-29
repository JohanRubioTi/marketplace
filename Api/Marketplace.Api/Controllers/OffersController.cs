// OfferController.cs
[HttpGet]
public async Task<IActionResult> GetOffersByPage(int pageNumber = 1, int pageSize = 10)
{
    var offers = await offerRepository.GetOffersByPageAsync(pageNumber, pageSize);

    var totalCount = await offerRepository.GetTotalOfferCountAsync(); // Implement this method to get the total count of offers.

    var result = new OfferPaginationResult
    {
        Offers = offers,
        PageNumber = pageNumber,
        PageSize = pageSize,
        TotalCount = totalCount
    };

    return Ok(result);
}
