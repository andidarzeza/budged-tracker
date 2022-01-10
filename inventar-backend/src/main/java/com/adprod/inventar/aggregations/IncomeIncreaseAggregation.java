package com.adprod.inventar.aggregations;

import com.adprod.inventar.models.ExpenseAggregationDTO;
import com.adprod.inventar.models.IncomeAggregationDTO;
import com.adprod.inventar.models.Incoming;
import com.adprod.inventar.models.Spending;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationExpression;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class IncomeIncreaseAggregation {

    private final MongoTemplate mongoTemplate;

    public IncomeIncreaseAggregation(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Double getIncomeIncreaseValue(String user, Instant from, Instant to, Double currentIncome) {
        from = from.atZone(ZoneId.systemDefault()).minusMonths(1).toInstant();
        to = to.atZone(ZoneId.systemDefault()).minusMonths(1).toInstant();
        List<AggregationOperation> aggregationResult = new ArrayList<>();
        aggregationResult.add(Aggregation.match(Criteria.where("createdTime").gte(from)));
        aggregationResult.add(Aggregation.match(Criteria.where("createdTime").lte(to)));
        aggregationResult.add(Aggregation.match(Criteria.where("user").is(user)));
        aggregationResult.add(Aggregation.group("$user").sum(AggregationExpression.from(MongoExpression.create("$sum: '$incoming'"))).as("income"));
        TypedAggregation<Incoming> tempAgg = Aggregation.newAggregation(Incoming.class, aggregationResult);
        List<IncomeAggregationDTO> resultSR = mongoTemplate.aggregate(tempAgg, "incoming", IncomeAggregationDTO.class).getMappedResults();
        Double incomeLastMonth = resultSR.size() > 0 ? resultSR.get(0).getIncome() : 0.0;
        Double averageLastMonth = this.calculateAverageForLastMonth(from, incomeLastMonth);
        return this.calculatePercentage(averageLastMonth, currentIncome);
    }

    private Double calculateAverageForLastMonth(Instant from, Double incomeLastMonth) {
        LocalDateTime ldt = LocalDateTime.ofInstant(from, ZoneId.systemDefault());
        YearMonth yearMonthObject = YearMonth.of(ldt.getYear(), ldt.getMonth().getValue());
        int daysInMonth = yearMonthObject.lengthOfMonth(); //28
        return incomeLastMonth / daysInMonth;
    }

    private Double calculatePercentage(Double lastMonthIncome, Double thisMonthIncome) {
        if(lastMonthIncome == 0.0) return 0.0;
        return  100 *(thisMonthIncome - lastMonthIncome) / lastMonthIncome;
    }
}