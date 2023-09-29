public class OfferPaginationResult
{
    public IEnumerable<Offer> Offers { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
}
