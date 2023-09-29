USE Sales
GO

CREATE OR ALTER PROCEDURE marketplace.WriteOrderProduct
    @OrderId int,
    @ProductId int = NULL,
    @Delete bit = 0,
    @Qty int = NULL,
    @UnitPrice money = NULL,
    @TotalPrice money = NULL
AS
BEGIN
    -- Check if the Order is Open
    IF NOT EXISTS (SELECT 1 FROM Orders WHERE OrderId = @OrderId AND Status = 'Open')
    BEGIN
        RAISEERROR('Cannot perform operations. Order status is not Open.', 16, 1)
        RETURN;
    END

    -- Validation: Check if ProductId, Qty, UnitPrice, and TotalPrice are greater than zero
    IF @ProductId IS NOT NULL AND @ProductId <= 0
        OR @Qty IS NOT NULL AND @Qty <= 0
        OR @UnitPrice IS NOT NULL AND @UnitPrice <= 0
        OR @TotalPrice IS NOT NULL AND @TotalPrice <= 0
    BEGIN
        RAISEERROR('Invalid input values. ProductId, Qty, UnitPrice, and TotalPrice must be greater than zero.', 16, 2)
        RETURN;
    END

    -- Perform CUD operations using MERGE statement
    MERGE INTO OrderProduct AS Target
    USING (SELECT @OrderId AS OrderId, @ProductId AS ProductId) AS Source
    ON Target.OrderId = Source.OrderId AND Target.ProductId = Source.ProductId
    WHEN MATCHED AND @Delete = 1 THEN
        DELETE
    WHEN MATCHED THEN
        UPDATE SET
            Qty = ISNULL(@Qty, Qty),
            UnitPrice = ISNULL(@UnitPrice, UnitPrice),
            TotalPrice = ISNULL(@TotalPrice, TotalPrice)
    WHEN NOT MATCHED THEN
        INSERT (OrderId, ProductId, Qty, UnitPrice, TotalPrice)
        VALUES (@OrderId, @ProductId, @Qty, @UnitPrice, @TotalPrice);

END
