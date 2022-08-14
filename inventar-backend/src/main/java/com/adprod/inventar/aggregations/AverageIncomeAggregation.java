package com.adprod.inventar.aggregations;


import com.adprod.inventar.models.IncomeAggregationDTO;
import com.adprod.inventar.models.Income;
import com.adprod.inventar.services.SecurityContextService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationExpression;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AverageIncomeAggregation {

    private final MongoTemplate mongoTemplate;
    private final SecurityContextService securityContextService;

    public Double getAverageDailyIncome(Instant from, Instant to, String range, String account) {
        LocalDateTime ldt = LocalDateTime.ofInstant(from, ZoneId.systemDefault());
        YearMonth yearMonthObject = YearMonth.of(ldt.getYear(), ldt.getMonth().getValue());
        int daysInMonth = range.equals("Monthly") ? yearMonthObject.lengthOfMonth() : LocalDate.now().getMonthValue(); //28
        List<AggregationOperation> aggregationResult = new ArrayList<>();
        aggregationResult.add(Aggregation.match(Criteria.where("createdTime").gte(from)));
        aggregationResult.add(Aggregation.match(Criteria.where("createdTime").lte(to)));
        aggregationResult.add(Aggregation.match(Criteria.where("user").is(securityContextService.username())));
        aggregationResult.add(Aggregation.match(Criteria.where("account").is(account)));
        aggregationResult.add(Aggregation.group("$user").sum(AggregationExpression.from(MongoExpression.create("$sum: '$incoming'"))).as("income"));
        TypedAggregation<Income> tempAgg = Aggregation.newAggregation(Income.class, aggregationResult);
        List<IncomeAggregationDTO> resultSR = mongoTemplate.aggregate(tempAgg, "incomes", IncomeAggregationDTO.class).getMappedResults();
        return resultSR.size() > 0 ? resultSR.get(0).getIncome() / daysInMonth : 0.0;
    }
}
