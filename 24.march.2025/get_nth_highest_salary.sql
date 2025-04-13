CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  DECLARE totalRows INT;
  SELECT COUNT( DISTINCT salary ) INTO totalRows FROM Employee;

  IF N > totalRows OR N < 0 THEN
    RETURN NULL;
  END IF;

  -- Otherwise, return the Nth highest salary
  RETURN (
        SELECT MIN(Top_n.salary)
        FROM (
            SELECT DISTINCT salary
            FROM Employee
            ORDER BY salary DESC
            LIMIT N
        ) AS Top_n
  );
END;



-- CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
-- BEGIN
-- SET N = N-1;
--   RETURN (
--       SELECT DISTINCT(salary) from Employee order by salary DESC
--       LIMIT 1 OFFSET N

--   );
-- END
