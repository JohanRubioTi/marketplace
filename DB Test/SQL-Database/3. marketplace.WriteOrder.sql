USE Sales
GO

CREATE OR ALTER PROCEDURE marketplace.WriteOrderProduct
    @OrderId int,
    @ProductId int,
    @Qty int,
    @UnitPrice decimal(18, 2),
    @TotalPrice decimal(18, 2),
    @Action varchar(10)
AS
BEGIN
    -- Validate Action parameter
    IF @Action NOT IN ('CREATE', 'UPDATE', 'DELETE')
    BEGIN
        RAISEERROR ('Invalid Action parameter. Use CREATE, UPDATE, or DELETE.', 16, 1)
        RETURN
    END

    -- Check if the order status is Open
    DECLARE @OrderStatus varchar(20)
    SELECT @OrderStatus = Status FROM Orders WHERE OrderId = @OrderId

    IF @OrderStatus <> 'Open'
    BEGIN
        RAISEERROR ('Order status is not Open. Cannot perform the operation.', 16, 1)
        RETURN
    END

    -- Validate input values
    IF @Qty <= 0 OR @UnitPrice <= 0 OR @TotalPrice <= 0
    BEGIN
        RAISEERROR ('Quantity, UnitPrice, and TotalPrice must be greater than zero.', 16, 1)
        RETURN
    END

    -- Perform actions based on the Action parameter using MERGE
    IF @Action = 'CREATE'
    BEGIN
        MERGE INTO OrderProduct AS Target
        USING (VALUES (@OrderId, @ProductId, @Qty, @UnitPrice, @TotalPrice)) AS Source (OrderId, ProductId, Qty, UnitPrice, TotalPrice)
        ON Target.OrderId = Source.OrderId AND Target.ProductId = Source.ProductId
        WHEN NOT MATCHED THEN
            INSERT (OrderId, ProductId, Qty, UnitPrice, TotalPrice)
            VALUES (Source.OrderId, Source.ProductId, Source.Qty, Source.UnitPrice, Source.TotalPrice);
    END
    ELSE IF @Action = 'UPDATE'
    BEGIN
        MERGE INTO OrderProduct AS Target
        USING (VALUES (@OrderId, @ProductId, @Qty, @UnitPrice, @TotalPrice)) AS Source (OrderId, ProductId, Qty, UnitPrice, TotalPrice)
        ON Target.OrderId = Source.OrderId AND Target.ProductId = Source.ProductId
        WHEN MATCHED THEN
            UPDATE SET Qty = Source.Qty, UnitPrice = Source.UnitPrice, TotalPrice = Source.TotalPrice;
    END
    ELSE IF @Action = 'DELETE'
    BEGIN
        DELETE FROM OrderProduct
        WHERE OrderId = @OrderId AND ProductId = @ProductId;
    END
END
GO
